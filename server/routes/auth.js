import {Router} from 'express'
import passport from 'passport'
import {Strategy as SteamStrategy} from 'passport-steam'

const RETURN_URL = '/auth/steam/return'
export const router = Router()

export default function setup (config) {
  passport.use(new SteamStrategy({
    returnURL: config.steam.realm + RETURN_URL,
    realm: config.steam.realm,
    apiKey: config.steam.api_key
  }, (identifier, profile, done) => {
    return done(null, profile)
  }))

  return router
}

router.get('/auth/steam',
  passport.authenticate('steam', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/')
  }
)

router.get(RETURN_URL,
  passport.authenticate('steam', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/')
  }
)

router.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/')
})
