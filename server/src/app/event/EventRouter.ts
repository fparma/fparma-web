import express, { Router } from 'express'
import * as Controller from './EventController';

const ROUTE = '/events'
const router = Router()

router.get('/', Controller.listEvents)
router.get('/event', Controller.findOne)

export const setupRoutes = (app: express.Application) => {
    app.use(ROUTE, router)
}
