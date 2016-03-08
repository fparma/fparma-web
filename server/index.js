import express from 'express'
import nconf from 'nconf'

import connectDatabase from './db'
import expressConfig from './config/express'
import passportConfig from './config/passport'
import {router} from './routes'
import {handle404, handleError} from './routes/error-handler'
import {files} from './utils/generate-contrib-markdown'

const IS_DEV = nconf.get('NODE_ENV') === 'development'
const app = express()

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
    userGuides: files
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

  app.listen(nconf.get('PORT')).on('listening', () => {
    console.log(`Server listening on ${nconf.get('PORT')} (${nconf.get('NODE_ENV')})`)
    process.send('server:started')
  })
})
