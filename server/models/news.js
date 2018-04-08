/* The Schema for news */
import mongoose from 'mongoose'
import moment from 'moment'

const NewsSchema = new mongoose.Schema({
  header: {type: String, required: true},
  text: {type: String, required: true},
  url: String,
  author: String,
  created_at: {
    type: Date,
    default: Date.now
  },
  meta: mongoose.Schema.Types.Mixed
})

NewsSchema.path('text').get(v => {
  if (v.length < 512) return v
  let str = v.substring(0, 512)
  let idx = str.lastIndexOf(' ')
  str = str.substring(0, idx !== -1 ? idx : 511) + ` ${String.fromCharCode(8230)}`
  return str
})

NewsSchema.virtual('display_date').get(function () {
  return moment.utc(this.created_at).format('YYYY-MMM-DD')
})

NewsSchema.virtual('meta.display_date').get(function () {
  return this.meta && this.meta.date && moment.utc(this.meta.date).format('YYYY-MMM-DD, HH:mm') || null
})

mongoose.model('News', NewsSchema)
