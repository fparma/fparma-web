/* The Schema for Events. References group model */
import mongoose from 'mongoose'
import slug from 'slug'

const Schema = mongoose.Schema

const EventSchema = new Schema({
  name: {type: String},
  description: {type: String},
  permalink: String,
  type: {type: String},
  authors: {type: String},
  date: {type: Date},
  original_date: {type: Date},
  created_at: {type: Date, default: Date.now},
  groups: [{type: mongoose.Schema.ObjectId, ref: 'Group'}]
})

EventSchema.pre('save', next => {
  if (this.permalink) return next()

  // FIXME: what do when permalink exists
  this.permalink = slug(`${this.type} - ${this.name}`, {
    symbols: false,
    lower: true
  })
})

mongoose.model('Event', EventSchema)
