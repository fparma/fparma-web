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
  }
})

NewsSchema.virtual('display_date').get(function () {
  return moment.utc(this.created_at).format('YYYY-MMM-DD')
})

mongoose.model('News', NewsSchema)
