import {Router} from 'express'
import _ from 'lodash'

import {ensureAuthenticated, ensureAdmin} from './auth'
import Media from '../controllers/media'

const router = Router()
export default router

router.get('/', (req, res, next) => {
  var i = 1
  let data = {count: 0, media: []}

  if (req.user && req.user.admin) {
    i++
    Media.getAmountUnapproved((err, v) => {
      if (err) return next(err)
      data.count = v
      done()
    })
  }

  Media.list((err, v) => {
    if (err) return next(err)
    data.media = v
    done()
  })

  let done = _.after(i, () => {
    res.render('media/gallery.jade', {
      page: 'media',
      title: 'Media',
      images: data.media.filter(v => v.is_image),
      videos: data.media.filter(v => !v.is_image),
      unapprovedCount: data.count
    })
  })
})

router.get('/submit', ensureAuthenticated, (req, res, next) => {
  res.render('media/submit.jade', {
    page: 'media',
    title: 'Submit new media'
  })
})

router.post('/submit', ensureAuthenticated, (req, res, next) => {
  let media = req.body || {}

  Media.create({
    url: media.url,
    caption: media.caption,
    type: media.type,
    author: {
      show: media.add === 'on',
      name: req.user.name,
      steam_id: req.user.steam_id
    }
  }, (err) => {
    if (err) return next(err)
    res.redirect('/media')
  })
})

router.get('/approval', ensureAdmin, (req, res, next) => {
  Media.getOneForApproval((err, data) => {
    if (err) return next(err)
    if (!data) return res.redirect('/media')

    res.render('media/approval.jade', {
      page: 'media',
      title: 'Approval',
      data: data
    })
  })
})

router.post('/approval', ensureAdmin, (req, res, next) => {
  let cb = err => {
    if (err) return next(err)
    res.redirect('/media/approval')
  }

  if (req.body.approve === 'on') {
    Media.approve(req.body.id, req.body.caption, cb)
  } else if (req.body.reject === 'on') {
    Media.reject(req.body.id, cb)
  } else {
    cb(new Error('Unknown action'))
  }
})
