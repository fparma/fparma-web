import { DatabaseTestUtil } from '../test/DatabaseTestUtil'
import { EventRepository } from './EventRepository'
import { Event } from '../entity/event/Event'
import moment from 'moment'
import { getCustomRepository, getRepository } from 'typeorm'
import { Group } from '../entity/event/Group'
import { Slot } from '../entity/event/Slot'

const testUtils = new DatabaseTestUtil()

const createEvent = (data?: Partial<Event>): Event => {
  return Object.assign({}, new Event(), data)
}

describe(EventRepository, () => {
  beforeAll(async () => await testUtils.connect())
  beforeEach(async () => await testUtils.dropAllTables())
  afterAll(async () => {
    await testUtils.dropAllTables()
    await testUtils.shutdown()
  })

  it('returns an empty list when no events', async () => {
    const list = await getCustomRepository(EventRepository).getEventList()
    expect(list).toEqual([])
  })

  it('queries an event list sorted by upcoming', async () => {
    // timestamp type does not save with ms
    const d = () => moment().milliseconds(0)
    const event1 = createEvent({
      date: d()
        .subtract(1, 'day')
        .toDate(),
    })
    const event2 = createEvent({ date: d().toDate() })
    const event3 = createEvent({
      date: d()
        .add(1, 'day')
        .toDate(),
    })

    await getRepository(Event).save([event1, event2, event3])
    const list = await getCustomRepository(EventRepository).getEventList()

    expect(list).toEqual(
      expect.arrayContaining([
        expect.objectContaining(event3),
        expect.objectContaining(event2),
        expect.objectContaining(event1),
      ])
    )
  })

  it('returns undefined for not found events', async () => {
    const event = await getCustomRepository(EventRepository).findFullEventById('not exist')
    expect(event).toBeNull()
  })

  it('finds a full event and populates it with groups and slots', async () => {
    const event1 = createEvent()

    const group = new Group()
    group.name = 'test'
    group.slots = [new Slot(), new Slot()]

    event1.groups = [group]
    const { id } = await getRepository(Event).save(event1)
    const event = (await getCustomRepository(EventRepository).findFullEventById(id)) as Event

    expect(event.groups).toHaveLength(1)
    expect(event.groups[0].slots).toHaveLength(2)
  })
})
