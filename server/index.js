import express from 'express'
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

// Middlewares
app.use(logger(IS_DEV ? 'dev' : 'combined'))
app.use(compression())
app.use(favicon(join(__dirname, '../public/favicon.ico')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(session({
  secret: config.session_secret,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static('public', {maxage: IS_DEV ? 0 : '1h'}))

// Router handling
app.use(router)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('404 Not Found')
  err.status = 404
  next(err)
})

// Error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  if (!err.status || err.status !== 404) console.error(err)
  res.render('error', {
    message: err.message,
    error: IS_DEV ? err : ''
  })
})

app.listen(config.PORT, () => console.log(`Server listening on ${config.PORT}`))
