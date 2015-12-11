import {Router} from 'express'
import _ from 'lodash'

const router = Router()
export default router

router.get('/', (req, res, next) => {
  let links = [
    'http://arma3.com/assets/img/screenshots/large/arma3_screenshot_01.jpg',
    'http://arma3.com/assets/img/screenshots/large/arma3_screenshot_02.jpg',
    'http://arma3.com/assets/img/screenshots/large/arma3_screenshot_03.jpg',
    'http://arma3.com/assets/img/screenshots/large/arma3_screenshot_04.jpg',
    'http://arma3.com/assets/img/screenshots/large/arma3_screenshot_05.jpg'
  ]

  res.render('media.jade', {
    page: 'media',
    title: 'Media',
    images: _.shuffle(_.map(links, (v) => {return {url: v, title: 'Lol', author: 'Cuel'}}))
  })
})

router.get('/approval', (req, res, next) => {
  res.end();
})
