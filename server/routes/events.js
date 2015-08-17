import {Router} from 'express'
import moment from 'moment'

const router = Router()
export default router

router.get('/events', (req, res) => {
  res.render('events/list.jade', {events: {upcoming: [], completed: []}})
})

router.get('/event/:permalink', (req, res) => {
  res.redirect('/events')
})
