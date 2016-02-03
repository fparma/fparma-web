import express from 'express'
import mongoose from 'mongoose'
import nconf from 'nconf'

import {init as expressConfig} from './config/express'
import {init as passportConfig} from './config/passport'
import {router} from './routes'
import {files} from './utils/generate-contrib-markdown'

const IS_DEV = nconf.get('NODE_ENV') === 'development'
const app = express()
export default app

expressConfig(app, __dirname, IS_DEV)
passportConfig(app)

// to handle cache bust
app.locals.app = {
  version: require('../package.json').version,
  userGuides: files
}

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
  // In rare cases when user has been dropped from DB
  if (err && err.name === 'NonExistingUserError') {
    req.logout()
    if (req.sesssion) req.session.destroy()
  }

  res.status(err.status || req.xhr && err.status !== 404 ? 200 : 500)
  if (err.status !== 404) console.error(err, err.stack.split('\n'))
  if (req.xhr) return res.json({ok: false, error: err.message})
  res.render('error', {
    title: err.status === 404 ? 'Not found' : 'Oops!',
    message: err.message,
    error: IS_DEV ? err : null
  })
})

let mOpt = {
  server: { socketOptions: { keepAlive: 1 } },
  user: nconf.get('DB:USER'),
  pass: nconf.get('DB:PASSWORD')
}

let errCb = e => {
  console.error('Failed to connect to DB', e)
  process.exit(1)
}

mongoose.connection.once('error', errCb)
mongoose.connect(nconf.get('DB:URI'), mOpt)

mongoose.connection.once('connected', () => {
  mongoose.connection.removeListener('error', errCb)
  mongoose.connection.on('error', console.error)
  console.log(`Mongoose connected to ${nconf.get('DB:URI')}`)
  app.listen(nconf.get('PORT')).on('listening', () => {
    console.log(`Server listening on ${nconf.get('PORT')} (mode: ${nconf.get('NODE_ENV')})`)
    process.send('server:started')
  })
})
