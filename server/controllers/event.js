import mongoose from 'mongoose'
import moment from 'moment'
import _ from 'lodash'

const ObjectId = mongoose.Types.ObjectId
const Event = mongoose.model('Event')
const Group = mongoose.model('Group')

const MAX_GROUPS = 40

// Saves a new event
exports.create = (evt, userId, cb) => {
  if (!_.isObject(evt) || _.isEmpty(evt)) return cb(new Error('No data received'))
  if (!_.isArray(evt.groups) || _.isEmpty(evt.groups)) return cb(new Error('Missing groups'))
  evt.created_by = userId

  if (evt.groups.length > MAX_GROUPS) return cb(new Error('Too many groups'))
  let groups = evt.groups.map(grp => new Group(grp))
  delete evt.groups

  let expectedGroups = groups.length
  let actual = 0

  let abort
  groups.forEach(grp => {
    grp.validate(e => {
      if (abort) return
      if (e) {
        abort = true
        return cb(e)
      }
      if (!(++actual >= expectedGroups)) return

      if (!evt.authors) delete evt.authors
      let event = new Event(evt)
      // Save all groups ids on the event and the event id on the groups
      // for .populate to work
      groups.forEach(grp => {
        grp.event_id = event.id
        event.groups.push(grp.id)
      })

      event.save(err => {
        if (err) {
          groups.forEach(grp => grp.remove())
          return cb(err)
        }

        actual = 0
        groups.forEach(grp => grp.save(err => {
          // TODO: just continue if a group failed to save?
          if (err) console.error(`Failed to save group ${grp._id}`, err)
          if (++actual >= expectedGroups) cb(null, event)
        }))
      })
    })
  })
}

// List events. No groups
exports.list = cb => {
  Event.find({})
  .sort({'date': 1})
  .limit(20)
  .lean()
  .exec((err, res) => {
    if (err) return cb(err)
    _.isArray(res) && res.forEach(v => v.displayDate = moment.utc(v.date).format('YYYY-MMM-DD, HH:mm'))

    cb(null, res)
  })
}

// Finds an event and populates all the groups
exports.findOne = (permalink, cb) => {
  Event.findOne({permalink: permalink})
  .populate('groups')
  .exec(cb)
}

// Finds the slot occupied by the user in an event and removes him
function unreserveSlot (eventId, user, cb) {
  let cond = {event_id: eventId, 'units.user_id': user.steam_id}
  let upd = {$set: {'units.$.user_id': null, 'units.$.user_name': null}}

  Group.findOneAndUpdate(cond, upd, cb)
}
exports.unreserveSlot = unreserveSlot

// Reserves a slot
// 1) Check if the slot is already taken
// 2) Remove whoever user that wants the slot from any
// other group in the same event
// 3) Reserve the slot
exports.reserveSlot = (eventId, unitId, user, cb) => {
  let cond = {event_id: eventId, 'units._id': unitId}
  Group.findOne(cond, (err, result) => {
    if (err) return cb(err)
    if (!result) return cb(new Error('Group or unit does not exist'))

    let slotTaken =
      result.units.filter(unit => (unit.id === unitId && unit.user_id)).length
    if (slotTaken) return cb(new Error('Selected slot is already occupied'))

    unreserveSlot(eventId, user, (err, res) => {
      if (err) return cb(err)

      let upd = {$set: {'units.$.user_id': user.steam_id, 'units.$.user_name': user.name}}
      Group.findOneAndUpdate(cond, upd, {new: true}, (err, newDoc) => {
        if (err) return cb(err)
        cb(null, true)
      })
    })
  })
}

// Clear whoever has taken the slot (kick, for admins)
exports.kickSlot = (eventId, unitId, cb) => {
  try {
    unitId = new ObjectId(unitId)
  } catch (e) {
    return cb(new Error('Invalid unit ID'))
  }

  let cond = {event_id: eventId, 'units._id': unitId}
  let upd = {$set: {'units.$.user_id': null, 'units.$.user_name': null}}
  Group.findOneAndUpdate(cond, upd, cb)
}
