/* The Schema a group with units. References Event schema */
import mongoose from 'mongoose'
const Schema = mongoose.Schema

const GroupSchema = new Schema({
  name: {type: String},
  side: {type: String},
  event_id: {type: Schema.ObjectId, ref: 'Event'},
  units: [{
    description: String,
    user_id: Number,
    user_name: String
  }]
})

mongoose.model('Group', GroupSchema)
