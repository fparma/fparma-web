import mongoose from 'mongoose'
const User = mongoose.model('User')

/**
* Finds or creates a new user.
*/
exports.findOrCreate = (profile, cb) => {
  let id = profile.id
  let info = profile._json

  User.findOne({steam_id: id})
  .lean()
  .exec((err, user) => {
    if (err) return cb(err)
    if (!user) {
      new User({steam_id: id, steam_info: info})
      .save((err, user) => {
        return cb(err, user)
      })
    } else {
      cb(null, user)
    }
  })
}

/**
* Finds one user after their Steam ID
*/
function findBySteamId (id, cb) {
  User.findOne({steam_id: id})
  .exec((err, user) => {
    if (err) return cb(err)
    if (!user) return cb(new Error('Error: Could not find user'))

    cb(null, user)
  })
}
exports.findBySteamId = findBySteamId

/**
* Saves the users username
*/
exports.saveUsername = (id, name, cb) => {
  User.find({name: name}, (err, users) => {
    if (err) return cb(err)
    if (users.length) return cb(new Error(`Error: Username ${name} is already taken`))

    findBySteamId(id, (err, user) => {
      if (err) return cb(err)
      if (user.name) return cb(new Error('Error: You have already selected a username'))

      user.name = name
      user.save((err, newUser) => {
        if (err) cb(err)
        cb(null, newUser)
      })
    })
  })
}
