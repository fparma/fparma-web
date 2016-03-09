import mongoose from 'mongoose'

const LogSchema = new mongoose.Schema({
  mission_id: String,
  created_at: Date,
  logs: [{
    time: Number,
    text: String
  }]
}, {
  collection: 'serverlogs'
})

LogSchema.virtual('world').get(function () {
  return this.mission_id.split('///')[0]
})

LogSchema.virtual('name').get(function () {
  return this.mission_id.split('///')[1]
})

exports.schema = LogSchema
