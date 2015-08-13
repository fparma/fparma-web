import {Router} from 'express'

const router = Router()
export default router

router.get('/', (req, res) => {
  res.render('index.jade', {page: 'home'})
})

router.get('/login', (req, res) => {
  res.render('login.jade', {title: 'Login', page: 'login'})
})
