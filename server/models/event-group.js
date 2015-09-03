/* The Schema a group with units. References Event schema */
import mongoose from 'mongoose'
const Schema = mongoose.Schema

const sides = ['blufor', 'opfor', 'greenfor', 'civilian']
let mkMsg = (str, i, isMin) => `${str} must have at ${isMin ? 'least' : 'most'} ${i} characters`

const GroupSchema = new Schema({
  name: {type: String, trim: true, minlength: [2, mkMsg('A group name', 2, true)], maxlength: [12, mkMsg('A group name', 2)]},
  side: {type: String, trim: true, enum: {values: sides, message: 'Invalid side for group: `{VALUE}`'}},
  event_id: {type: Schema.ObjectId, ref: 'Event'},
  units: [{
    description: {type: String, trim: true, minlength: [2, mkMsg('A unit description', 2, true)], maxlength: [12, mkMsg('A unit description', 12)]},
    user_id: Number,
    user_name: String
  }]
})

GroupSchema.path('units').validate(v => v && v.length && v.length <= 20, 'Group must have at least 1 unit and max 20')

mongoose.model('Group', GroupSchema)
