import {Router} from 'express'

import auth from './auth'
import events from './events'
import profile from './profile'
import media from './media'
import admin from './admin'
import squadXml from './squad-xml'
import guides from './guides'
import News from '../controllers/news'

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

router.get('/guides/:id', guides)
router.get('/squad.xml', squadXml)

router.get('/about', (req, res) => {
  res.render('about.jade', {page: 'about', title: 'About'})
})

router.get('/policy', (req, res) => {
  res.render('policy.jade', {tite: 'Policy'})
})
