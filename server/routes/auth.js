import {Router} from 'express'
import passport from 'passport'
import {Strategy as SteamStrategy} from 'passport-steam'
import User from '../controllers/user'
const RETURN_URL = '/auth/steam/return'
export const router = Router()

export default function setup (config) {
  passport.use(new SteamStrategy({
    returnURL: config.steam.realm + RETURN_URL,
    realm: config.steam.realm,
    apiKey: config.steam.api_key
  }, (identifier, profile, done) => {
    User.findOrCreate(profile, (err, user) => {
      done(err, user)
    })
  }))
  return router
}

passport.serializeUser(function (user, done) {
  done(null, user.steam_id)
})
passport.deserializeUser(function (id, done) {
  User.findBySteamId(id, (err, user) => done(err, user))
})

router.get('/auth/steam',
  passport.authenticate('steam', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/')
  }
)

router.get(RETURN_URL,
  passport.authenticate('steam', { failureRedirect: '/login' }),
  function (req, res) {
    if (req.user && !req.user.name) return res.redirect('/profile')
    res.redirect('/')
  }
)

router.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/')
})
