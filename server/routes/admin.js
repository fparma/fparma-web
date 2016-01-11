import {Router} from 'express'
import moment from 'moment'

import Logs from '../controllers/server-logs'
import {ensureAdmin} from './auth'

const router = Router()
export default router

router.all('*', ensureAdmin)

router.get('/logs', (req, res, next) => {
  Logs.list((err, logs) => {
    if (err) return next(err)

    let date = logs.length
      ? moment.utc(logs[0].created_at).format('YYYY-MM-DD, HH:mm:ss')
      : null

    res.render('admin/logs.jade', {
      page: 'admin',
      title: 'Server logs',
      log: logs[0],
      logs,
      date,
      convertSeconds: s => {
        return moment('2015-01-01').startOf('day').seconds(s).format('HH:mm:ss')
      }
    })
  })
})

router.post('/logs/search', (req, res, next) => {
  Logs.findOne(req.body.id, (err, log) => {
    if (err) return next(err)
    if (!log) return res.status(404).end()
    res.render('includes/server-log.jade', {
      log,
      date: moment.utc(log.created_at).format('YYYY-MM-DD, HH:mm:ss'),
      convertSeconds: s => {
        return moment('2015-01-01').startOf('day').seconds(s).format('HH:mm:ss')
      }
    })
  })
})
