import passport from 'passport'
import { Strategy as SteamStrategy } from 'passport-steam'
import User from '../controllers/user'

export const STEAM_RETURN_URL = '/auth/steam/return'

passport.serializeUser(function (user, done) {
  done(null, user.steam_id)
})

passport.deserializeUser(function (id, done) {
  User.findBySteamId(id, (err, user) => {
    if (err) return done(err)
    if (!user) return done(new Error('Missing user'))
    done(null, {
      _id: user._id,
      name: user.name,
      admin: user.admin,
      steam_id: user.steam_id
    })
  })
})

export default function (app) {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new SteamStrategy({
    returnURL: process.env.STEAM_REALM + STEAM_RETURN_URL,
    realm: process.env.STEAM_REALM,
    apiKey: process.env.STEAM_KEY
  }, (identifier, profile, done) => {
    User.findOrCreate(profile, (err, user) => {
      done(err, user)
    })
  }))
}
