import bodyParser from 'body-parser'
import compression from 'compression'
import MongoStore from 'connect-mongo'
import express from 'express'
import session from 'express-session'
import mongoose from 'mongoose'
import logger from 'morgan'
import { join } from 'path'
import favicon from 'serve-favicon'


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
    secret: process.env.SESSION_SECRET,
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
      touchAfter: 600
    }),
    resave: false,
    saveUninitialized: false
  }))
}
