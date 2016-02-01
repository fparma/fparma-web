import fs from 'fs'
import {Router} from 'express'
import nconf from 'nconf'
import _ from 'lodash'
import builder from 'xmlbuilder'

import auth from './auth'
import events from './events'
import profile from './profile'
import media from './media'
import admin from './admin'
import News from '../controllers/news'
import User from '../controllers/user'
import {files as userGuides} from '../utils/generate-contrib-markdown'

export const router = Router()

// Redirect users first time logging in to select username
router.all('*', (req, res, next) => {
  if (!req.isAuthenticated()) return next()
  if (req.user.name) return next()
  if (/^\/profile/.test(req.url) || req.url === '/logout') return next()
  res.redirect('/profile')
})

router.get('/', (req, res) => {
  News.list((err, data) => {
    if (err) console.error(err)
    res.render('index.jade', {page: 'home', news: data || []})
  })
})

router.use(auth)
router.use('/profile', profile)
router.use('/media', media)
router.use('/events', events)
router.use('/admin', admin)

router.get('/about', (req, res) => {
  res.render('about.jade', {page: 'about', title: 'About'})
})

router.get('/policy', (req, res) => {
  res.render('policy.jade', {tite: 'Policy'})
})

router.get('/guides/:id', (req, res, next) => {
  let id = req.url
  let guide = userGuides.find(v => v.url === id)
  if (!guide) return next()

  // TODO: makes this better. use cache
  fs.readFile(guide.file, 'utf8', (err, data) => {
    if (err) return next() // 404

    res.render('user-guides/guide.jade', {
      title: guide.title,
      topMenu: 'guides',
      guide: data
    })
  })
})

router.get('/squad.xml', (req, res, next) => {
  User.getUnitsForXml((err, users) => {
    if (err) return next(err)
    var root = builder.create('squad')
    root.dtd('squad.dtd')

    _.forOwn(nconf.get('SQUAD_XML'), (v, key) => {
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

    var xmlString = root.end({pretty: true})
    res.set('Content-Type', 'application/xml')
    res.set('Cache-Control', 'private, no-cache, no-store, must-revalidate')
    res.set('Expires', '-1')
    res.set('Pragma', 'no-cache')
    res.send(xmlString)
  })
})
