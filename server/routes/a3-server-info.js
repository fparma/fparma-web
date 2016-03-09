import request from 'request'
import parser from 'xml2json'

export default function (req, res, next) {
  request({
    url: 'http://arma3.swec.se/server/xml/79571',
    headers: {'User-Agent': 'request'}
  }, (err, response, body) => {
    if (err || response.statusCode !== 200) {
      if (err) console.error(err)
      return res.json({ok: false, message: 'Could not query server'})
    }

    let data = JSON.parse(parser.toJson(body))
    let ret = null

    if (data && data.server) {
      ret = {}
      let d = data.server

      ret.name = d.name
      ret.adress = `${d.host}:${d.port}`
      ret.players = d.players
      ret.state = typeof d.state === 'string' ? d.state : 'unknown'
      ret.mission = d.mission
      ret.island = d.island
      ret.maxPlayers = 99
      ret.playersList = []
      if (d.game) {
        ret.maxPlayers = d.game.max_players || 99

        if (d.game.players && d.game.players.player) {
          ret.playersList = d.game.players.player
          .filter(v => typeof v.disconnect_time !== 'string')
          .map(v => v.name)
        }
      }
    }
    res.json({ ok: true, data: ret })
  })
}
