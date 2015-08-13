import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import passport from 'passport'
import logger from 'morgan'
import favicon from 'serve-favicon'
import compression from 'compression'
import {join} from 'path'
import router from './routes'

let config
try {
  config = require('../config.json')
} catch (e) {
  config = require('../config.example.json')
}

const app = express()
export default app

app.set('x-powered-by', false)
const IS_DEV = app.locals.IS_DEV = (process.env.NODE_ENV || 'development') === 'development'

// View engine
app.set('views', join(__dirname, 'views'))
app.set('view engine', 'jade')

// Middlewares. ORDER MATTERS
app.use(compression())
app.use(favicon(join(__dirname, '../public/img/favicon.ico')))
app.use(logger(IS_DEV ? 'dev' : 'combined'))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
  secret: config.session_secret,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

// Router handling
app.use(router(config))
app.use(express.static('public', {maxage: IS_DEV ? 0 : '1h'}))

// router didn't handle - 404
app.use((req, res, next) => {
  var err = new Error('404 Not Found')
  err.status = 404
  next(err)
})

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  if (!err.status || err.status !== 404) console.error(err)
  res.render('error', {
    title: err.status === 404 ? 'Not found' : 'Oops!',
    page: '404',
    message: err.message,
    error: IS_DEV === 'development' ? err : ''
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
  app.listen(config.port, () => console.log(`Server listening on ${config.port}`))
})
