/* The Schema for Events. References group model */
import mongoose from 'mongoose'
const Schema = mongoose.Schema

const EventSchema = new Schema({
  name: {type: String},
  type: {type: String},
  authors: {type: String},
  date: {type: Date},
  original_date: {type: Date},
  created_at: {type: Date, default: Date.now},
  groups: [{type: mongoose.Schema.ObjectId, ref: 'Group'}]
})

mongoose.model('Event', EventSchema)
