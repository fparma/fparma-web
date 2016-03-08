import {Router} from 'express'

import Logs from '../controllers/server-logs'
import {countUsers} from '../controllers/user'
import {getEventAttendence, countEvents} from '../controllers/event'
import dateUtil from '../utils/date-util'
import {ensureAdmin} from './auth'

const router = Router()
export default router

router.all('*', ensureAdmin)

function renderLogListCb (res, next, err, logs) {
  if (err) return next(err)

  res.render('admin/logs.jade', {
    page: 'admin',
    topMenu: 'admin',
    title: 'Server logs',
    log: logs[0],
    logs,
    dateUtil
  })
}

function getColorHSL (value) {
  let hue = (value * 120).toString(10)
  return ['hsl(', hue, ', 100% ,50%)'].join('')
}

router.get('/stats', (req, res, next) => {
  Promise.all([
    countUsers(),
    countEvents(),
    getEventAttendence()
  ])
  .then(data => {
    let [amountUsers, amountEvents, eventAttendence] = data
    eventAttendence.forEach(v => v.color = getColorHSL(v.attended / amountEvents))

    res.render('admin/stats.jade', {
      page: 'admin',
      title: 'Stats',
      topMenu: 'admin',
      amountUsers,
      amountEvents,
      eventAttendence
    })
  })
  .catch(next)
})

router.get('/logs', (req, res, next) => {
  Logs.list((err, logs) => renderLogListCb(res, next, err, logs))
})

// specific log or 404, redirect
router.get('/logs/*', (req, res, next) => {
  let id = req.url.split('/').last()
  if (!id) return res.redirect('/admin/logs')

  Logs.list(id, (err, logs) => {
    if (err) return res.redirect('/admin/logs')
    renderLogListCb(res, next, null, logs)
  })
})

// xhr - partial render a log
router.post('/logs/search', (req, res, next) => {
  Logs.findOne(req.body.id, (err, log) => {
    if (err) return next(err)
    if (!log) return res.status(404).end()
    res.render('includes/server-log.jade', {
      log,
      dateUtil
    })
  })
})
