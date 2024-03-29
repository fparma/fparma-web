import express from 'express'
import nconf from 'nconf'
import mongoose, { mongo } from 'mongoose'
import session from 'express-session'
import logger from 'morgan'
import favicon from 'serve-favicon'
import compression from 'compression'
import bodyParser from 'body-parser'
import MongoStore from 'connect-mongo'
import { join } from 'path'


export default function (app, root, IS_DEV) {
  app.set('x-powered-by', false)

  // View engine
  app.set('views', join(root, 'views'))
  app.set('view engine', 'jade')

  // Middlewares
  app.use(compression())
  app.use(favicon(join(root, '../public/favicon.ico')))
  app.use(logger(IS_DEV ? 'dev' : 'combined'))
  app.use(express.static('public', { maxage: IS_DEV ? 0 : '7d' }))

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(session({
    name: 'connect.fparma',
    // trust reverse proxy from heroku
    proxy: !IS_DEV,
    // enable rolling sessions
    rolling: true,
    secret: nconf.get('SESSION:SECRET'),
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
      touchAfter: 600
    }),
    resave: false,
    saveUninitialized: false
  }))
}
