import mongoose from 'mongoose'
import News from './news'
import _ from 'lodash'

const Event = mongoose.model('Event')
const Group = mongoose.model('Group')

const MAX_GROUPS = 40

// Saves a new event
exports.create = (evt, user, cb) => {
  if (!_.isObject(evt) || _.isEmpty(evt)) return cb(new Error('No data received'))
  if (!_.isArray(evt.groups) || _.isEmpty(evt.groups)) return cb(new Error('Missing groups'))
  evt.created_by = user.steam_id

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
        if (err) return cb(err)

        actual = 0
        groups.forEach(grp => grp.save(err => {
          // TODO: just continue if a group failed to save?
          if (err) console.error(`Failed to save group ${grp.id}`, err)
          if (++actual >= expectedGroups) {
            News.create({
              header: `New event: ${event.name}`,
              text: event.description,
              url: `/events/event/${event.permalink}`,
              author: user.name
            })
            cb(null, event)
          }
        }))
      })
    })
  })
}

// List events. No groups
exports.list = cb => {
  Event.find({})
  .sort({'date': -1})
  .limit(20)
  .exec((err, res) => {
    if (err) return cb(err)

    cb(null, res)
  })
}

// Finds an event and populates all the groups
exports.findOne = (permalink, cb) => {
  Event.findOne({permalink: permalink})
  .populate('groups')
  .exec(cb)
}

exports.findOneById = (id, cb) => {
  Event.findOne({_id: id})
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
      Group.findOneAndUpdate(cond, upd, (err) => {
        if (err) return cb(err)
        cb(null, true)
      })
    })
  })
}

// Clear whoever has taken the slot (kick, for admins)
exports.kickSlot = (eventId, unitId, cb) => {
  let cond = {event_id: eventId, 'units._id': unitId}
  let upd = {$set: {'units.$.user_id': null, 'units.$.user_name': null}}
  Group.findOneAndUpdate(cond, upd, cb)
}

/*
 * Stats for admin page. returns promise
*/

exports.countEvents = () => {
  return Event.count().exec()
}

exports.getEventAttendence = () => {
  return Group.aggregate([
    { $unwind: '$units' },
    { $project: { _id: 0, id: '$units.user_id', name: '$units.user_name' } },
    { $match: { id: { '$ne': null }, name: { '$ne': null } } },
    { $group: { _id: { id: '$id', name: '$name' }, count: { $sum: 1 } } },
    { $project: { _id: 0, name: '$_id.name', attended: '$count' } },
    { $sort: { attended: -1 } }
  ]).exec()
}
