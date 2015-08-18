import {Router} from 'express'
import bodyParser from 'body-parser'

const sqmJsonParser = bodyParser.json({limit: '3000kB'})
const router = Router()
export default router

router.get('/', (req, res) => {
  res.render('events/list.jade', {events: {upcoming: [], completed: []}})
})

router.get('/id/:permalink', (req, res) => {
  res.redirect('/events')
})

router.get('/create', (req, res) => {
  res.render('events/create.jade')
})

router.post('/create/upload-sqm', sqmJsonParser, (req, res) => {
  console.log('ok!')
  res.status(200).json({msg: 'ok'})
}, (err, req, res, next) => {
  console.log(err)
  if (err) {
    if (err.type === 'entity.too.large') {
      return res.status(413).json({error: 'File exceeds limit (3mb)'})
    }
    return next(err)
  }
})
