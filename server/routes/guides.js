import fs from 'fs'
import {guides } from '../utils/generate-contrib-markdown'

export default function (req, res, next) {
  let id = req.url
  let guide = guides.find(v => v.url === id)
  if (!guide) return next()

  // TODO: makes this better. use cache
  fs.readFile(guide.file, 'utf8', (err, data) => {
    if (err) return next() // 404

    res.render('user-guides/guide.jade', {
      title: guide.title,
      topMenu: 'guides',
      guide: data
    })
  })
}
