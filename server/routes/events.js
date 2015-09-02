import {Router} from 'express'
import multer from 'multer'
import mongoose from 'mongoose'
import {readFile, unlink} from 'fs'
import sqmParser from '../utils/sqm-parser'

// import {ensureAuthenticated, ensureAdmin} from './auth'

const Event = mongoose.model('Event')

const storage = multer.diskStorage({
  // use computer temp folder
  destination: './tmp',
  filename: (req, file, cb) => cb(null, `${Date.now()}${Math.random(100)}.sqm`)
})
const upload = multer({
  storage: storage,
  limits: {
    fields: 0,
    files: 1,
    fileSize: 1024 * 1024 * 3 // 3mb. FIXME: doesn't work atm
  },
  fileFilter: (req, file, cb) => {
    file.originalname.endsWith('.sqm')
      ? cb(null, true)
      : cb(new Error('Not an .sqm file'))
  }
}).single('file')

const router = Router()
export default router

router.get('/', (req, res) => {
  res.render('events/list.jade', {page: 'events', title: 'Events', events: {upcoming: [], completed: []}})
})

router.get('/id/:permalink', (req, res) => {
  res.redirect('/events')
})

router.get('/create', (req, res) => {
  res.render('events/create.jade', {title: 'Create event', page: 'events'})
})

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
}, (err, req, res, next) => {
  console.error(err)
  res.json({ok: false, error: err.message})
})

router.post('/create', (req, res, next) => {
  Event.create(req.body.event, req.user._id, (err, evt) => {
    res.status(200).json({
      ok: !!err,
      data: err ? null : evt,
      error: err ? err.message : null
    })
  })
})
