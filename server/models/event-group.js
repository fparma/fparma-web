/* The Schema a group with units. References Event schema */
import mongoose from 'mongoose'
const Schema = mongoose.Schema

const SIDES = ['blufor', 'opfor', 'greenfor', 'civilian']
const MIN = 2
const MAX = 24
let mkMsg = (str, isMin) => `${str} can have at ${isMin ? 'least' : 'most'} ${isMin ? MIN : MAX} characters`

const GroupSchema = new Schema({
  name: {type: String, trim: true, minlength: [MIN, mkMsg('A group name', true)], maxlength: [MAX, mkMsg('A group name')]},
  side: {type: String, trim: true, enum: {values: SIDES, message: 'Invalid side for group: `{VALUE}`'}},
  event_id: {type: Schema.ObjectId, ref: 'Event'},
  units: [{
    description: {type: String, trim: true, minlength: [MIN, mkMsg('A unit description', true)], maxlength: [MAX, mkMsg('A unit description')]},
    user_id: String,
    user_name: String
  }]
})

GroupSchema.path('units').validate(v => v && v.length && v.length <= 20, 'Group must have at least 1 unit and max 20')

mongoose.model('Group', GroupSchema)
