/* The Schema a group with units. References Event schema */
import mongoose from 'mongoose'
const Schema = mongoose.Schema

const SIDES = ['blufor', 'opfor', 'greenfor', 'civilian']
const MIN = 2
const MAX = 24
let msgMin = (str) => `${str} must have at least ${MIN} characters`
let msgMax = (str, override) => `${str} can have at most ${override ? override : MAX} characters`

const GroupSchema = new Schema({
  name: {type: String, trim: true, minlength: [MIN, msgMin('A group name')], maxlength: [MAX, msgMax('A group name')]},
  side: {type: String, trim: true, enum: {values: SIDES, message: 'Invalid side for group: `{VALUE}`'}},
  description: {type: String, trim: true, maxlength: [99, msgMax("A group's description", 99)]},
  event_id: {type: Schema.ObjectId, ref: 'Event'},
  units: [{
    description: {type: String, trim: true, minlength: [MIN, msgMin('A unit description')], maxlength: [MAX, msgMax('A unit description')]},
    user_id: String,
    user_name: String
  }]
})

GroupSchema.path('units').validate(v => v && v.length && v.length <= 20, 'Group must have at least 1 unit and max 20')

GroupSchema.virtual('is_full').get(function () {
  return this.units.filter(v => v.user_id).length === this.units.length
})

mongoose.model('Group', GroupSchema)
