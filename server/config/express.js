import express from 'express'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import logger from 'morgan'
import favicon from 'serve-favicon'
import compression from 'compression'
import bodyParser from 'body-parser'
import {join} from 'path'

export function init (app, config, root, IS_DEV) {

  app.set('x-powered-by', false)

  // View engine
  app.set('views', join(root, 'views'))
  app.set('view engine', 'jade')

  // Middlewares. ORDER MATTERS
  app.use(compression())
  app.use(favicon(join(root, '../public/img/favicon.ico')))
  app.use(logger(IS_DEV ? 'dev' : 'combined'))
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(cookieParser())
  app.use(session({
    secret: config.session_secret,
    resave: false,
    saveUninitialized: false
  }))
  app.use(express.static('public', {maxage: IS_DEV ? 0 : '1h'}))
}
