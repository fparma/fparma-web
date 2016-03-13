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
  Returns all logs, the latest log have text filled
  Filters out logs with < 3 entries
*/
exports.list = (id, cb) => {
  let q = {'logs.3': {$exists: true}}

  if (typeof id === 'function') {
    // Just get the latest
    cb = id
  } else {
    // Requested specific log
    try {
      q._id = mongoose.Types.ObjectId.createFromHexString(id)
    } catch (e) {
      return cb(new Error('Invalid log ID'))
    }
  }

  Logs.findOne(q)
  .sort({created_at: -1})
  .exec((err, log) => {
    if (err) return cb(err)
    if (!log) return cb(null, [])

    // Remove the first log we've found
    let q = {mission_id: {$ne: log.mission_id}, 'logs.3': {$exists: true}}
    let logs = [log]

    Logs.find(q, {logs: 0})
    .sort({created_at: -1})
    .exec((err, data) => {
      if (err || !data.length) return cb(null, logs)
      cb(null, logs.concat(data))
    })
  })
}

/*
  Find one log + text
*/
exports.findOne = (hexId, cb) => {
  try {
    var id = mongoose.Types.ObjectId.createFromHexString(hexId)
  } catch (e) {
    return cb(new Error('Invalid log ID'))
  }

  Logs.findOne({
    _id: id
  })
  .exec(cb)
}
