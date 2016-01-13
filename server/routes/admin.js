import {Router} from 'express'

import Logs from '../controllers/server-logs'
import dateUtil from '../utils/date-util'
import {ensureAdmin} from './auth'

const router = Router()
export default router

router.all('*', ensureAdmin)

function renderLogListCb (res, next, err, logs) {
  if (err) return next(err)

  res.render('admin/logs.jade', {
    page: 'admin',
    title: 'Server logs',
    log: logs[0],
    logs,
    dateUtil
  })
}

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
