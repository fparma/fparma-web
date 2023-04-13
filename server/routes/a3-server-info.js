import Gamedig from 'gamedig'
import { secondsToHHMMSS } from '../utils/date-util'

const ISLANDS = {
  anim_helvantis_v2: 'Helvantis',
  reshmaan: 'Reshmaan',
  vr: 'Virtual Reality'
}

// Use a small cache for 2 min in case of failure
let ttl = 120 * 1000 // sec
let cached = null
let lastUpdated = 0
function getCached() {
  console.info('Game query failed, using cache')
  if ((Date.now() - lastUpdated) > ttl) cached = null
  if (cached) return cached
  return {
    name: '[EU] Facepunch OP Server [Hosted by Comfy]',
    state: 'unknown'
  }
}

export default function (req, res, next) {
  Promise.all([
    getA3ServerInfo(),
    getTS3Info()
  ])
    .then(data => {
      let ret = data[0]
      ret.ts3 = data[1]
      lastUpdated = Date.now()
      cached = ret
      res.json({ ok: true, data: ret })
    })
    .catch((err) => {
      console.error(err);
      res.status(500).end()
    })
}

function getA3ServerInfo() {
  return new Promise(async (resolve, reject) => {
    const d = await Gamedig.query({
      type: 'arma3',
      host: 'fparma.com',
      attemptTimeout: 6000,
    })

    let ret = {}

    ret.name = d.name
    ret.adress = `${d.query ? d.query.address : 'fparma.com'}:${d.query ? d.query.port : '2302'}`
    ret.players = d.players.map(v => {
      return {
        name: v.name || 'unknown',
        time: v.time ? secondsToHHMMSS(v.time).substring(0, 5) : 0
      }
    })
    ret.state = ret.players.length ? 'playing' : 'waiting'
    ret.mission = d.raw ? d.raw.game : 'Unknown'
    let island = ISLANDS[(d.map || '').toLowerCase()]
    ret.island = island ? island : d.map
    ret.maxPlayers = ret.players.length ? d.maxplayers : 99
    resolve(ret)
  })
}

function getTS3Info() {
  return new Promise(async (resolve, reject) => {
    const d = Gamedig.query({
      type: 'teamspeak3',
      host: 'thor.prfn.se',
      attemptTimeout: 6000
    }).catch(reject)

    if (!d.raw) {
      return resolve([])
    }


    let root = d.raw.channels.find(v => v.channel_name === 'FPARMA 3' || v.cid === '979')
    if (!root || !root.cid) {
      console.warn('Failed to find main teamspeak 3 channel')
      return resolve([])
    }

    let channels = [root]
    let subChannels = d.raw.channels.filter(v => v.pid === root.cid).map(v => v.cid)
    let recurse = id => {
      channels.push(id)
      d.raw.channels.filter(v => v.pid === id).forEach(v => recurse(v.cid))
    }
    subChannels.forEach(recurse)

    let clients = d.players.filter(v => channels.indexOf(v.cid) !== -1).map(v => v.name)
    resolve(clients)
  })
}
