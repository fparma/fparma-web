import {Router} from 'express'
import nconf from 'nconf'
import _ from 'lodash'
import builder from 'xmlbuilder'
import auth from './auth'
import events from './events'
import News from '../controllers/news'

export const router = Router()

// Redirect users first time logging in to select username
router.all('*', (req, res, next) => {
  if (!req.isAuthenticated()) return next()
  if (req.user.name) return next()
  if (~['/profile', '/logout'].indexOf(req.url)) return next()
  res.redirect('/profile')
})

router.get('/', (req, res) => {
  News.list((err, data) => {
    if (err) console.error(err)
    res.render('index.jade', {page: 'home', news: data || []})
  })
})

router.use(auth)
router.use('/events', events)

router.get('/about', (req, res) => {
  res.render('about.jade', {page: 'about'})
})

router.get('/policy', (req, res) => {
  res.render('policy.jade', {tite: 'Policy'})
})

router.get('/squad.xml', (req, res) => {
  var root = builder.create('squad')
  root.dtd('squad.dtd')

  _.forOwn(nconf.get('SQUAD_XML'), (v, key) => {
    if (/nick/.test(key)) return root.att(key, v)
    root.ele(key, v)
  })

  /*
  units.forEach((v) => {
    root.ele({
      member: {
        '@id': v.id,
        '@nick': v.name,
        remark: v.remark
      }
    })
  })
  */

  var xmlString = root.end({pretty: true})
  res.set('Content-Type', 'application/xml')
  res.send(xmlString)
})
