import gameQuery from 'game-server-query'
import {secondsToHHMMSS} from '../utils/date-util'

const ISLANDS = {
  anim_helvantis_v2: 'Helvantis',
  reshmaan: 'Reshmaan',
  vr: 'Virtual Reality'
}

// Use a small cache for 2 min in case of failure
let ttl = 120 * 1000 // sec
let cached = null
let lastUpdated = 0
function getCached () {
  console.info('Game query failed, using cache')
  if ((Date.now() - lastUpdated) > ttl) cached = null
  if (cached) return cached
  return {
    name: '[EU] Facepunch OP Server [Hosted by Profan]',
    state: 'unknown'
  }
}

export default function (req, res, next) {
  let ret = {}
  gameQuery({
    type: 'arma3',
    host: 'prfn.se'
  }, d => {
    if (d.error) {
      console.error(d.error)
      ret = getCached()
    } else {
      ret.name = d.name
      ret.adress = `${d.query ? d.query.address : 'prfn.se'}:${d.query ? d.query.port : '2302'}`
      ret.players = d.players.map(v => {
        return {
          name: v.name || 'unknown',
          time: v.time ? secondsToHHMMSS(v.time).substring(0, 5) : 0
        }
      })
      ret.state = ret.players.length ? 'playing' : 'waiting'
      ret.mission = d.raw ? d.raw.game : 'Unknown'
      let island = ISLANDS[(d.map || '').toLowerCase()]
      ret.island = island ? island : d.map
      ret.maxPlayers = ret.players.length ? d.maxplayers : 99
    }
    lastUpdated = Date.now()
    cached = ret
    res.json({ok: true, data: ret})
  })
}
