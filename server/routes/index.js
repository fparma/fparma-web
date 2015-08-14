import {Router} from 'express'
import auth from './auth'

const router = Router()
export default function setup (config) {
  router.use(auth(config))
  return router
}

function ensureAuthenticated (req, res, next) {
  if (!req.isAuthenticated()) return res.redirect('/login')
  next()
}

// make user available to all templates and
// redirect if logged in and not selected username
router.all('*', function (req, res, next) {
  res.locals.user = req.user
  if (req.isAuthenticated() && !req.user.name && req.url !== '/profile') {
    return res.redirect('/profile')
  }
  next()
})

router.get('/', (req, res) => {
  res.render('index.jade', {page: 'home'})
})

router.get('/login', (req, res) => {
  res.render('login.jade', {title: 'Login', page: 'login'})
})

router.get('/profile', ensureAuthenticated, (req, res) => {
  res.render('profile.jade', {title: 'Profile', page: 'profile'})
})

router.post('/profile', ensureAuthenticated, (req, res) => {

})
