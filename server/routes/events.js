import {Router} from 'express'
import multer from 'multer'
import mongoose from 'mongoose'
// import {ensureAuthenticated, ensureAdmin} from './auth'

const Event = mongoose.model('Event')

const storage = multer.diskStorage({
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

// TODO: handle deleted /tmp folder
router.post('/create/upload-sqm', upload, (req, res) => {
  console.log('success')
  console.log(req.file)
  res.json({ok: true, data: null})
}, (err, req, res, next) => {
  console.log('error')
  console.log(err)
  res.json({ok: false, error: err.message})
})

router.post('/create', (req, res, next) => {
  Event.create(req.body.event, (err, evt) => {
    res.status(200).json({
      ok: !!err,
      data: err ? null : evt,
      error: err ? err.message : null
    })
  })
})
