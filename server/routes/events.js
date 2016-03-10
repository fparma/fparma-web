import {Router} from 'express'
import multer from 'multer'
import {readFile, unlink} from 'fs'
import sqmParser from '../utils/sqm-parser'
import errHelper from '../utils/error-helper'
import Event from '../controllers/event'
import moment from 'moment'
import {ensureAuthenticated, ensureAdmin} from './auth'

const router = Router()
export default router

router.get('/', (req, res, next) => {
  Event.list((err, events) => {
    if (err) return next(err)

    let now = moment.utc()
    // upcoming should be displayed in descending, so reverse it
    let upc = events.filter(v => v.date > now).reverse()
    let cmp = events.filter(v => v.date < now)

    res.render('events/list.jade', {
      page: 'events',
      title: 'Events',
      events: {upcoming: upc, completed: cmp}
    })
  })
})

router.get('/event/:permalink', ensureAuthenticated, (req, res, next) => {
  Event.findOne(req.params.permalink, (err, event) => {
    if (err) return next(err)
    if (!event) return next()

    let slots = {
      total: event.groups.map(v => {
        return v.units.length
      }).reduce((a, b) => { return a + b }),

      taken: event.groups.map(v => {
        return v.units.filter(v => {
          if (v.user_name) return true
        }).length
      }).reduce((a, b) => { return a + b })
    }

    res.render('events/event.jade', {
      page: 'events',
      event,
      slots,
      time: moment.utc(event.date).format('YYYY-MMM-DD, HH:mm')
    })
  })
})

router.post('/rate-event', ensureAuthenticated, (req, res, next) => {
  let body = req.body || {}
  Event.rate(body.eventId, req.user.steam_id, body.rating, (err, doc) => {
    if (err) return next(err)
    res.json({
      ok: true,
      data: {
        amount: doc.user_ratings.length,
        rating: doc.rating
      }
    })
  })
})

router.post('/slot-*', (req, res, next) => {
  let body = req.body || {}
  Event.findOneById(body.eventId, (err, data) => {
    if (err) return next(err)
    if (data && data.completed) return next(new Error('Event is closed'))
    next()
  })
})

router.post('/slot-reserve', ensureAuthenticated, (req, res) => {
  let body = req.body || {}

  Event.reserveSlot(body.eventId, body.slotId, req.user, (err, data) => {
    if (err) return res.json({ok: false, error: err.message})
    res.json({ok: true, data})
  })
})

router.post('/slot-unreserve', ensureAuthenticated, (req, res) => {
  let eventId = (req.body || {}).eventId

  Event.unreserveSlot(eventId, req.user, (err, data) => {
    if (err) return res.json({ok: false, error: err.message})
    res.json({ok: true, data: !!data})
  })
})

router.post('/slot-kick', ensureAdmin, (req, res) => {
  let body = req.body || {}

  Event.kickSlot(body.eventId, body.slotId, (err, data) => {
    if (err) return res.json({ok: false, error: err.message})
    res.json({ok: true, data: !!data})
  })
})

router.get('/create', ensureAdmin, (req, res) => {
  res.render('events/create.jade', {title: 'Create event', page: 'events'})
})

router.post('/create', ensureAdmin, (req, res, next) => {
  Event.create(req.body, req.user, (err, evt) => {
    res.status(200).json({
      ok: !err,
      data: err ? null : evt.permalink,
      error: err ? errHelper(err, true) : null
    })
  })
})

// SQM File upload
const storage = multer.diskStorage({
  destination: './tmp',
  filename: (req, file, cb) => cb(null, `${Date.now()}_${Math.random(100)}.sqm`)
})

const upload = multer({
  storage: storage,
  limits: {
    fields: 0,
    files: 1,
    fileSize: 1024 * 1024 * 3 // 3mb
  },
  fileFilter: (req, file, cb) => {
    file.originalname.endsWith('.sqm') ? cb(null, true) : cb(new Error('Not an .sqm file'))
  }
}).single('file')

// TODO: handle deleted /tmp folder?
router.post('/create/upload-sqm', upload, (req, res, next) => {
  // FIXME: multer doesn't give an error for filesize atm
  if (!req.file) return next(new Error('Upload failed'))
  readFile(req.file.path, 'utf8', (err, data) => {
    unlink(req.file.path)
    if (err) return next(err)

    sqmParser(data, (err, parsed) => {
      if (err) return next(err)
      res.json({ok: true, data: parsed})
    })
  })
})
