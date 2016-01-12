import mongoose from 'mongoose'
import nconf from 'nconf'
import LogsModel from '../models/server-logs'

// Logs uses a different database
let connection
let uri = nconf.get('DB:LOGS_URI')

if (!uri) {
  console.warn('Missing server logs database? Using standard connection.')
  connection = mongoose
} else {
  connection = mongoose.createConnection(uri)
  connection.once('connected', () => {
    console.info('Server logs DB connected.')
  })
}

const Logs = connection.model('LogSchema', LogsModel.schema)

/*
 Returns all logs, latest log have text filled
*/
exports.list = (cb) => {
  Logs.findOne()
  .sort({created_at: -1})
  .exec((err, log) => {
    if (err) return cb(err)
    if (!log) return cb(null, [])

    let q = {mission_id: {$ne: log.mission_id}}
    let logs = [log]

    Logs.find(q, {logs: 0})
    .sort({created_at: -1})
    .exec((err, data) => {
      if (err || !data.length) return cb(null, logs)
      data.forEach(v => logs.push(v))

      cb(null, logs)
    })
  })
}

/*
  Find one log + text
*/
exports.findOne = (mission_id, cb) => {
  Logs.findOne({mission_id: mission_id}, {_id: 0})
  .exec(cb)
}
