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
app.set('port', process.env.NODE_ENV || config.port)

// Make user available to Jade templates
app.use((req, res, next) => {
  res.locals.user = req.isAuthenticated() ? req.user : {}
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
  res.status(err.status || req.xhr && err.status !== 404 ? 200 : 500)
  if (err.status !== 404) console.error(err, err.stack.split('\n'))
  if (req.xhr) return res.json({ok: false, error: err.message})
  res.render('error', {
    title: err.status === 404 ? 'Not found' : 'Oops!',
    message: err.message,
    error: IS_DEV ? err : null
  })
})

let mOpt = { server: { socketOptions: { keepAlive: 1 } } }
mongoose.connect(config.db_url, mOpt)
mongoose.connection.on('error', console.error)

mongoose.connection.once('connected', () => {
  let conn = mongoose.connection
  console.log(`Mongoose connected to ${conn.host}:${conn.port}/${conn.name}`)
  app.listen(app.get('port'), () => {
    console.log(`Server listening on ${app.get('port')} (mode: ${process.env.NODE_ENV || 'development'})`)
  })
})
