import passport from 'passport'
import {Strategy as SteamStrategy} from 'passport-steam'
import User from '../controllers/user'

export const STEAM_RETURN_URL = '/auth/steam/return'

passport.serializeUser(function (user, done) {
  done(null, user.steam_id)
})
passport.deserializeUser(function (id, done) {
  User.findBySteamId(id, (err, user) => done(err, user))
})

export function init (app, config) {

  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new SteamStrategy({
    returnURL: config.steam.realm + STEAM_RETURN_URL,
    realm: config.steam.realm,
    apiKey: config.steam.api_key
  }, (identifier, profile, done) => {
    User.findOrCreate(profile, (err, user) => {
      done(err, user)
    })
  }))
}
