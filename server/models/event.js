/* The Schema for Events. References group model */
import mongoose from 'mongoose'
import moment from 'moment'
import slug from 'slug'

const Schema = mongoose.Schema
let mkMsg = (str, i, isMin) => `${str} must have at ${isMin ? 'least' : 'most'} ${i} characters`

const EventSchema = new Schema({
  image_url: {type: String, trim: true},
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: [4, mkMsg('Name', 4, true)],
    maxlength: [48, mkMsg('Name', 48, false)]
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: [24, mkMsg('Description', 24, true)],
    maxlength: [4096, mkMsg('Description', 4096, false)]
  },
  type: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
    enum: {
      values: ['co', 'tvt'],
      message: 'Type must be CO or TVT'
    }
  },
  authors: {
    type: String,
    default: 'System',
    trim: true,
    maxlength: [24, mkMsg('Authors', 24, false)]
  },
  user_ratings: [{
    user_id: {type: String, required: true},
    rating: {type: Number, min: 0, max: 5}
  }],
  permalink: String,
  date: {type: Date, required: true},
  created_at: {type: Date, default: Date.now},
  created_by: String,
  groups: [{type: mongoose.Schema.ObjectId, ref: 'Group'}]
})

EventSchema.path('groups').validate(v => {
  v && v.length && v.length <= 40
}, 'Event groups must be at least 1 and max 40')

let dateError = 'Date must be 2 hours ahead and max 2 months in the future'
EventSchema.path('date').validate(v => {
  if (!moment.utc(v).isValid()) return false
  let time = moment.utc().add(2, 'hours')
  if (v < time) return false
  if (v > time.subtract(2, 'hours').add(2, 'months')) return false
  return true
}, dateError)

EventSchema.pre('save', function (next) {
  if (this.permalink) return next()

  let permalink = slug(`${this.type} - ${this.name}`, {
    symbols: false,
    lower: true
  })

  let query = {$or: [{permalink: permalink}, {date: {
    $gt: moment.utc(this.date).subtract(1, 'hour').toISOString(),
    $lt: moment.utc(this.date).add(1, 'hour').toISOString()
  }}]}

  mongoose.model('Event').findOne(query, (err, res) => {
    if (err) return next(err)
    if (res && permalink === res.permalink) return next(new Error('Event name is taken'))
    if (res) return next(new Error(`Event cannot be within 1 hour of another event (${res.name})`))

    this.permalink = permalink
    return next()
  })
})

EventSchema.path('date').set(v => {
  let d = moment.utc(v ? v : moment.utc())
  let m = d.minutes()
  d.minutes((m >= 15 && m <= 45) ? 30 : 0)
  return d.seconds(0).milliseconds(0)
})

EventSchema.virtual('completed').get(function () {
  return moment.utc() > moment.utc(this.date)
})

EventSchema.virtual('display_date').get(function () {
  return moment.utc(this.date).format('YYYY-MMM-DD, HH:mm')
})

EventSchema.virtual('rating').get(function () {
  if (!this.user_ratings.length) return 0
  let nr = this.user_ratings.map(v => v.rating).reduce((a, b) => a + b)
  return Math.round(nr / (this.user_ratings.length))
})

mongoose.model('Event', EventSchema)
