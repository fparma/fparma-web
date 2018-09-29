import express from 'express'
import { getCustomRepository } from 'typeorm'
import { EventRepository } from '../../repository/EventRepository'
import { jsonReply } from '../../util/JsonReply'

export const listEvents = async (req: express.Request, res: express.Response) =>
  getCustomRepository(EventRepository)
    .getEventList()
    .then(events => jsonReply.ok({ res, data: events }))
    .catch(err => jsonReply.fail({ res, error: err }))

export const findOne = async (req: express.Request, res: express.Response) =>
  getCustomRepository(EventRepository)
    .findFullEventById(req.params.id)
    .then(event => jsonReply.ok({ res, data: event }))
    .catch(err => jsonReply.fail({ res, error: err }))
