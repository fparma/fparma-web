import express from 'express'
import { startServer } from './app/Server'
import { Config } from './Config'

const middlewares = [express.json(), express.urlencoded({ extended: false })]
startServer(parseInt(Config.get('APP_PORT'), 10), middlewares)
