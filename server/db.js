import nconf from 'nconf'
import mongoose from 'mongoose'

const MONGO_OPTIONS = {
  server: { socketOptions: { keepAlive: 1 }, server: { auto_reconnect: true } },
  user: nconf.get('DB:USER'),
  pass: nconf.get('DB:PASSWORD')
}

export default function connectDatabase (callback) {
  let errCb = e => callback(e)
  mongoose.connection.once('error', errCb)
  mongoose.connect(nconf.get('DB:URI'), MONGO_OPTIONS)

  mongoose.connection.once('connected', () => {
    mongoose.connection.removeListener('error', errCb)
    mongoose.connection.on('error', console.error)
    console.log(`Mongoose connected to ${nconf.get('DB:URI')}`)
    callback(null)
  })
}
