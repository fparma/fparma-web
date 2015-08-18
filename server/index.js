import express from 'express'
import mongoose from 'mongoose'

import {init as expressConfig} from './config/express'
import {init as passportConfig} from './config/passport'
import {router} from './routes'

let config
try {
  config = require('../config.json')
} catch (e) {
  config = require('../config.example.json')
}

const IS_DEV = (process.env.NODE_ENV || 'development') === 'development'
const app = express()
export default app

expressConfig(app, config, __dirname, IS_DEV)
passportConfig(app, config)

// Make user available to Jade templates
app.use((req, res, next) => {
  res.locals.IS_DEV = IS_DEV
  res.locals.user = req.isAuthenticated() ? req.user : null
  next()
})

// Handle routes
app.use(router)

// router didn't handle - 404
app.use((req, res, next) => {
  var err = new Error('404 Not Found')
  err.status = 404
  next(err)
})

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  console.log(err.stack)
  if (!err.status || err.status !== 404) console.error(err)
  // TODO: handle this better. if user has been dropped from DB.
  if (err.message === 'No such user') req.logout()
  res.render('error', {
    title: err.status === 404 ? '404 Not found' : 'Oops!',
    page: '404',
    message: err.message,
    error: IS_DEV ? err : null
  })
})

// Connect to mongodb
var connect = function () {
  var options = { server: { socketOptions: { keepAlive: 1 } } }
  mongoose.connect(config.db_url, options)
}
connect()

mongoose.connection.on('error', console.log)
mongoose.connection.on('disconnected', connect)

mongoose.connection.once('connected', () => {
  console.log(`Mongoose connected to ${config.db_url}`)
  app.listen(config.port, () => console.log(`Server listening on ${config.port} (dev: ${IS_DEV})`))
})
