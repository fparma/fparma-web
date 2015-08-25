import mongoose from 'mongoose'
import _ from 'lodash'

const Event = mongoose.model('Event')
const Group = mongoose.model('Group')

const MAX_GROUPS = 40
const ALLOWED_SIDES = /blufor|opfor|greenfor|civilian/

// Saves a new event
exports.create = (evt, cb) => {
  let abortErr = false
  if (!_.isObject(evt) || _.isEmpty(evt)) return cb(new Error('No data received'))
  if (!_.isArray(evt.groups) || _.isEmpty(evt.groups)) return cb(new Error('Missing groups'))

  let groups = evt.groups.map(grp => new Group(grp))
  delete evt.groups

  // Validate groups. No validation occurs in event-group
  if (groups.length >= MAX_GROUPS) return cb(new Error('Too many groups'))
  groups.some(grp => {
    if (!ALLOWED_SIDES.test(grp.side)) abortErr = new Error('Group with invalid side')
    if (!_.isArray(grp.units) || _.isEmpty(grp.units)) abortErr = new Error('Group is missing units')
    // TODO: regexp for unit descriptions. maybe save all errors instead of overwriting
    return abortErr
  })

  if (abortErr) return cb(abortErr)

  let event = new Event(evt)

  // Save all groups ids on the event and the event id on the groups
  // for .populate to work
  groups.forEach(grp => {
    grp.event_id = event._id
    event.groups.push(grp._id)
  })

  event.save(err => {
    if (err) {
      groups.forEach(grp => grp.remove())
      return cb(err)
    }

    let expectedGroups = groups.length
    let actual = 0
    groups.forEach(grp => grp.save(err => {
      // TODO: maybe remove the event if a group failed to save
      if (err) console.error(`Failed to save group ${grp._id}`, err)
      if (++actual >= expectedGroups) cb(null, event)
    }))
  })
}

// Finds an event with no groups populated
exports.getEventInfo = (id, cb) => {
  Event.findOne({_id: id})
  .lean()
  .exec(cb)
}

// Finds the entire event and populates all the groups
exports.getEvent = (id, cb) => {
  Event.findOne({_id: id})
  .populate('groups')
  .lean()
  .exec(cb)
}

exports.reserveSlot = (eventId, unitId, user, cb) => {
  Group.findOneAndUpdate({event_id: eventId, 'units._id': unitId},)
}

exports.unreserveSlot = (groupId, unitId, cb) => {
  //Group.find({event})
}
