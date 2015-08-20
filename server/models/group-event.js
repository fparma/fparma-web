/* The Schema a group with units. References Event schema */
import mongoose from 'mongoose'
const Schema = mongoose.Schema

const GroupSchema = new Schema({
  event_id: {type: Schema.ObjectId, ref: 'Event'},
  side: {type: String},
  units: [{
    description: String,
    player_id: Number,
    player_name: String
  }]
})

mongoose.model('Group', GroupSchema)
