import express from 'express'
import connectDatabase from './db'
import expressConfig from './config/express'
import passportConfig from './config/passport'
import { router } from './routes'
import { handle404, handleError } from './routes/error-handler'
import { guides } from './utils/generate-contrib-markdown'

require('dotenv').config()

const app = express()
const IS_DEV = process.env.NODE_ENV === 'development'

connectDatabase((err) => {

  if (err) {
    console.error('Failed to connect to DB', err)
    return process.exit(1)
  }

  expressConfig(app, __dirname, IS_DEV)
  passportConfig(app)

  app.locals.app = {
    // to handle cache bust
    version: require('../package.json').version,
    // for nav. renders the guides
    userGuides: guides
  }

  // Make user available to Jade templates
  app.use((req, res, next) => {
    res.locals.user = req.isAuthenticated() ? req.user : {}
    next()
  })

  // Handle routes
  app.use(router)
  app.use(handle404)
  app.use(handleError(IS_DEV))

  app.listen(process.env.PORT).on('listening', () => {
    console.log(`Server listening`)
    if (process.send) {
      process.send('server:started')
    }
  })
})
