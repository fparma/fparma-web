import {Router} from 'express'
import {ensureAuthenticated} from './auth'
import User from '../controllers/user'
import {USR_REGEXP, USR_ERROR} from '../models/user'
import _ from 'lodash'

const router = Router()
export default router

router.get('/', ensureAuthenticated, (req, res, next) => {
  User.getUserSquadSettings(req.user.steam_id, (err, user) => {
    if (err) return next(err)

    res.render('profile.jade', {
      title: 'Profile',
      page: 'profile',
      validation: {REG: USR_REGEXP, MSG: USR_ERROR},
      squadSettings: user.squad
    })
  })
})

router.post('/name', ensureAuthenticated, (req, res, next) => {
  User.saveUsername(req.user.steam_id, req.body.username, (err, user) => {
    if (err) return next(err)
    return res.redirect('/')
  })
})

let validString = (str) => _.isString(str) && !_.isEmpty(str)
router.post('/squad', ensureAuthenticated, (req, res, next) => {
  User.updateSquadSettings(req.user.steam_id, {
    show: req.body.add === 'on',
    nick: validString(req.body.nick) ? req.body.nick : 'N/A',
    remark: validString(req.body.remark) ? req.body.remark : 'N/A'
  }, (err, doc) => {
    if (err) return next(err)
    res.redirect('/profile')
  })
})
