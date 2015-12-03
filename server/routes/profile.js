import {Router} from 'express'
import {ensureAuthenticated} from './auth'
import User from '../controllers/user'
import {USR_REGEXP, USR_ERROR} from '../models/user'

const router = Router()
export default router

router.get('/', ensureAuthenticated, (req, res) => {
  res.render('profile.jade', {title: 'Profile', page: 'profile', validation: {REG: USR_REGEXP, MSG: USR_ERROR}})
})

router.post('/name', ensureAuthenticated, (req, res, next) => {
  User.saveUsername(req.user.steam_id, req.body.username, (err, user) => {
    if (err) return next(err)
    return res.redirect('/')
  })
})

router.post('/squad', ensureAuthenticated, (req, res, next) => {

})
