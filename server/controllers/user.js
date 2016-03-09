import mongoose from 'mongoose'
import _ from 'lodash'
const User = mongoose.model('User')
const Group = mongoose.model('Group')

/**
* Finds or creates a new user.
*/
exports.findOrCreate = (profile, cb) => {
  let id = profile.id
  let info = profile._json

  User.findOne({steam_id: id})
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
    if (!user) {
      let err = new Error('Could not find user')
      err.name = 'NonExistingUserError'
      return cb(err)
    }

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
    if (users.length) return cb(new Error(`Username ${name} is already taken`))

    findBySteamId(id, (err, user) => {
      if (err) return cb(err)
      if (user.name) return cb(new Error('You have already selected a username'))

      user.name = name
      user.save((err, rowsAffected) => {
        if (err) cb(err)
        cb(null, rowsAffected)
      })
    })
  })
}

exports.getUnitsForXml = (cb) => {
  User.find({'squad.show': true})
  .exec(cb)
}

exports.getProfileData = (id, cb) => {
  Promise.all([
    User.findOne({steam_id: id}, {squad: 1}).exec(),
    Group.count({'units.user_id': {$in: [id]}}).exec()
  ])
  .then((data) => {
    let squadSettings = _.isObject(data[0]) ? data[0].squad : {}
    let attendedEvents = _.isNumber(data[1]) ? data[1] : 0
    cb(null, {squadSettings, attendedEvents})
  })
  .catch(cb)
}

/*
* Updates preferences for squad.xml
*/
exports.updateSquadSettings = (id, settings, cb) => {
  User.findOneAndUpdate({steam_id: id}, {
    $set: {squad: settings}
  }, cb)
}

/*
 *  stats for admin page. Returns promise
*/
exports.countUsers = () => {
  return User.count().exec()
}
