import mongoose from 'mongoose'
const User = mongoose.model('User')

/**
* Finds or creates a new user.
*/
exports.findOrCreate = (profile, cb) => {
  let id = profile.id
  let info = profile._json

  findBySteamId(id, (err, user) => {
    if (user) return cb(null, user)
    if (err.message === 'No such user') {
      new User({steam_id: id, steam_info: info})
      .save((err, user) => {
        if (err) return cb(err)
        return cb(null, user)
      })
    }else {
      cb(err)
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
    if (!user) return cb(new Error('No such user'))

    cb(null, user)
  })
}
exports.findBySteamId = findBySteamId

/**
* Saves the selected username
*/
exports.saveUserName = (id, name, cb) => {
  User.find({name: name}, (err, users) => {
    if (err) return cb(err)
    if (users.length) return cb(new Error('Name already taken'))

    findBySteamId(id, (err, user) => {
      if (err) return cb(err)
      if (user.name) return cb(new Error('Name already chosen'))

      user.set('name', name)
      user.save((err, newUser) => {
        if (err) cb(err)
        cb(null, newUser)
      })
    })
  })
}
