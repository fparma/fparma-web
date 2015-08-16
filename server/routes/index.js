import {Router} from 'express'
import auth from './auth'
import {USR_REGEXP, USR_ERROR} from '../models/user'
import {saveUserName} from '../controllers/user'

const router = Router()
export default function setup (config) {
  router.use(auth(config))
  return router
}

function ensureAuthenticated (req, res, next) {
  if (!req.isAuthenticated()) {
    let err = new Error('You do not have permission to view this page')
    err.status = 401
    return next(err)
  }
  next()
}

// make user available to all templates and
// redirect if logged in and not selected username
router.all('*', function (req, res, next) {
  if (!req.isAuthenticated()) return next()

  res.locals.user = req.user
  if (!req.user.name && req.url !== '/profile') {
    if (req.url === '/logout') {
      req.logout()
      return res.redirect('/')
    }
    return res.redirect('/profile')
  }

  if (req.method === 'POST' && req.url === '/profile') {
    saveUserName(req.user.steam_id, req.body.username, (err, user) => {
      if (err) return next(err)
      return res.redirect('/')
    })
  }
  next()
})

router.get('/', (req, res, next) => {
  res.render('index.jade', {page: 'home'})
})

router.get('/login', (req, res) => {
  if (req.isAuthenticated()) return res.redirect('/profile')
  res.render('login.jade', {title: 'Login', page: 'login'})
})

router.get('/profile', ensureAuthenticated, (req, res) => {
  res.render('profile.jade', {title: 'Profile', page: 'profile', validation: {REG: USR_REGEXP, MSG: USR_ERROR}})
})

router.post('/profile', ensureAuthenticated, (req, res) => {

})
