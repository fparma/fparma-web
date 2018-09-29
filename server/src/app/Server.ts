import express from 'express'

export const startServer = (port: number, middlewares: express.RequestHandler[] = []): express.Application => {
  const app = express()
  middlewares.forEach(middleware => app.use(middleware))
  app.listen(port)
  return app
}
