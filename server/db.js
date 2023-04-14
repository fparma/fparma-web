import mongoose from 'mongoose'


export default function connectDatabase(callback) {
  let errCb = e => callback(e)

  mongoose.connection.once('error', errCb)

  mongoose.connect(process.env.DB_URI, {
    keepAlive: 1,
    auto_reconnect: true,
    user: process.env.DB_USER,
    pass: process.env.DB_PASSWORD,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  mongoose.connection.once('connected', () => {
    mongoose.connection.removeListener('error', errCb)
    mongoose.connection.on('error', console.error)
    console.log(`Mongoose connected`)
    callback(null)
  })
}
