import {Router} from 'express'
import auth from './auth'
import events from './events'

export const router = Router()

// Redirect users first time logging in to select username
router.all('*', (req, res, next) => {
  if (!req.isAuthenticated()) return next()
  if (req.user.name) return next()
  if (~['/profile', '/logout'].indexOf(req.url)) return next()
  res.redirect('/profile')
})

router.get('/', (req, res, next) => {
  res.render('index.jade', {page: 'home'})
})

router.use(auth)
router.use('/events', events)
