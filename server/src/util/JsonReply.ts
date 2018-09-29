import express from 'express'
import { HTTP } from '../../../shared/definitions/HttpCodes'
interface IOptions {
  res: express.Response
  status?: HTTP
  data?: any
  error?: Error
}

export class jsonReply {
  static ok(opts: IOptions) {
    const { res, status = HTTP.OK, data = null } = opts
    return res.status(status).json({ ok: true, data, error: null })
  }

  static fail(opts: IOptions) {
    const { res, status = HTTP.INTERNAL_SERVER_ERROR, error = null } = opts
    return res.status(status).json({ ok: false, error, data: null })
  }
}
