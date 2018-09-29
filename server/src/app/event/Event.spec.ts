import express from 'express';
import request from 'supertest';
import * as typeorm from 'typeorm';
import { setupRoutes } from './EventRouter';

describe('Event', () => {
    let mockEventList = jest.fn()
    let mockFindOne = jest.fn()

    jest.spyOn(typeorm, 'getCustomRepository').mockImplementation(() => {
        return {
            findFullEventById: mockFindOne,
            getEventList: mockEventList
        }
    })

    let app: express.Application
    beforeEach(() => {
        jest.clearAllMocks()
        app = express()
        setupRoutes(app)
    })

    it('sets up the router', () => {
        jest.spyOn(app, 'use').mockImplementationOnce(jest.fn())
        setupRoutes(app)
        expect(app.use).toHaveBeenCalledWith('/events', expect.any(Function))
    })

    it('returns a list of events', (done) => {
        mockEventList.mockImplementationOnce(() => Promise.resolve(['test']))

        request(app)
            .get('/events/')
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) fail(err)
                expect(mockEventList).toHaveBeenCalledTimes(1)
                expect(res.body).toEqual(expect.objectContaining({ ok: true, data: ['test'] }))
                done()
            })
    })


    it('replies on /events error', (done) => {
        mockEventList.mockImplementationOnce(() => Promise.reject(new Error()))

        request(app)
            .get('/events/')
            .expect(500)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) fail(err)
                expect(res.body).toEqual(expect.objectContaining({ ok: false }))
                done()
            })
    })

    it('finds one event', (done) => {
        mockFindOne.mockImplementationOnce(() => Promise.resolve('test'))

        request(app)
            .get('/events/event')
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) fail(err)
                expect(mockFindOne).toHaveBeenCalledTimes(1)
                expect(res.body).toEqual(expect.objectContaining({ ok: true, data: 'test' }))
                done()
            })
    })

    it('replies on findone error ', (done) => {
        mockFindOne.mockImplementationOnce(() => Promise.reject(new Error()))

        request(app)
            .get('/events/event')
            .expect(500)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) fail(err)
                expect(res.body).toEqual(expect.objectContaining({ ok: false }))
                done()
            })
    })
})
