import {Router} from 'express'
import passport from 'passport'

import {STEAM_RETURN_URL} from '../config/passport'
import User from '../controllers/user'
import {USR_REGEXP, USR_ERROR} from '../models/user'

const router = Router()
export default router

export function ensureAuthenticated (req, res, next) {
  if (!req.isAuthenticated()) {
    let err = new Error('Sorry! You do not have permission to view this page')
    err.status = 401
    return next(err)
  }
  next()
}

export function ensureAdmin (req, res, next) {
  if (req.isAuthenticated() && req.user.admin) {
    return next()
  }

  let err = new Error('Not authorized')
  err.status = 401
  return next(err)
}

router.get('/login', (req, res) => {
  if (req.isAuthenticated()) return res.redirect('/profile')
  res.render('login.jade', {title: 'Login', page: 'login'})
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

router.get('/auth/steam',
  passport.authenticate('steam', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/')
  }
)

router.get(STEAM_RETURN_URL,
  passport.authenticate('steam', { failureRedirect: '/login' }),
  (req, res) => {
    if (req.isAuthenticated() && !req.user.name) return res.redirect('/profile')
    res.redirect('/')
  }
)

router.get('/profile', ensureAuthenticated, (req, res) => {
  res.render('profile.jade', {title: 'Profile', page: 'profile', validation: {REG: USR_REGEXP, MSG: USR_ERROR}})
})

router.post('/profile', ensureAuthenticated, (req, res, next) => {
  User.saveUsername(req.user.steam_id, req.body.username, (err, user) => {
    // In rare cases when user has been dropped from DB
    if (err && err.name === 'NonExistingUserError') req.logout()
    if (err) return next(err)
    return res.redirect('/')
  })
})
