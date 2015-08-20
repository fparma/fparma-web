import mongoose from 'mongoose'
import _ from 'lodash'

const Event = mongoose.model('Event')
const Group = mongoose.model('Group')

const MAX_GROUPS = 40
const ALLOWED_SIDES = /blufor|opfor|greenfor|civilian/

exports.create = (evt, cb) => {
  let abortErr = false
  if (!_.isObject(evt) || _.isEmpty(evt)) return cb(new Error('No data received'))
  if (!_.isArray(evt.groups) || _.isEmpty(evt.groups)) return cb(new Error('Missing groups'))

  let groups = evt.groups.forEach(grp => new Group(grp))
  delete evt.groups

  if (groups.length >= MAX_GROUPS) return cb(new Error('Too many groups'))
  groups.some(grp => {
    if (!ALLOWED_SIDES.test(grp.side)) abortErr = new Error('Invalid group')
    if (!_.isArray(grp.units) || _.isEmpty(grp.units)) abortErr = new Error('Group missing units')
    // TODO: regexp for unit descriptions. maybe save all errors instead of overwriting
    return abortErr
  })

  if (abortErr) return cb(abortErr)

  let event = new Event(evt)
  groups.forEach(grp => {
    grp.event_id = event._id
    event.groups.push(grp._id)
  })
}
