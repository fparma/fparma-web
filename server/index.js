import express from 'express'
import mongoose from 'mongoose'
import nconf from 'nconf'

import {init as expressConfig} from './config/express'
import {init as passportConfig} from './config/passport'
import {router} from './routes'

const IS_DEV = nconf.get('NODE_ENV') === 'development'
const app = express()
export default app

expressConfig(app, __dirname, IS_DEV)
passportConfig(app)

app.locals.app = {
  version: require('../package.json').version
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
mongoose.connect(nconf.get('DB:URI'), mOpt)
mongoose.connection.on('error', console.error)

mongoose.connection.once('connected', () => {
  console.log(`Mongoose connected to ${nconf.get('DB:URI')}`)
  app.listen(nconf.get('PORT')).on('listening', () => {
    console.log(`Server listening on ${nconf.get('PORT')} (mode: ${nconf.get('NODE_ENV')})`)
  })
})
