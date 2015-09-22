import {Router} from 'express'
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

router.get('/', (req, res, next) => {
  News.list((err, data) => {
    if (err) console.error(err)
    res.render('index.jade', {page: 'home', news: data || []})
  })
})

router.use(auth)
router.use('/events', events)

router.get('/about', (req, res, next) => {
  res.render('about.jade', {page: 'about'})
})
