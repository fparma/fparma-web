import _ from 'lodash'
import builder from 'xmlbuilder'
import User from '../controllers/user'

const topLevelInfo = {
  "nick": "FP",
  "name": "Facepunch ARMA",
  "email": "N/A",
  "web": "fparma.herokuapp.com",
  "picture": "fparma.paa",
  "title": "FPARMA"
}

export default function (req, res, next) {
  User.getUnitsForXml((err, users) => {
    if (err) return next(err)
    var root = builder.create('squad')
    root.dtd('squad.dtd')

    _.forOwn(topLevelInfo, (v, key) => {
      if (key === 'nick') return root.att(key, v)
      root.ele(key, v)
    })

    users.forEach((v) => {
      root.ele({
        member: {
          '@id': v.steam_id,
          '@nick': v.squad.nick,
          name: 'N/A',
          email: 'N/A',
          icq: 'N/A',
          remark: v.squad.remark
        }
      })
    })

    var xmlString = root.end({ pretty: true })
    res.set('Content-Type', 'application/xml')
    res.set('Cache-Control', 'private, no-cache, no-store, must-revalidate')
    res.set('Expires', '-1')
    res.set('Pragma', 'no-cache')
    res.send(xmlString)
  })
}
