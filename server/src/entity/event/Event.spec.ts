import { DatabaseTestUtil } from '../../test/DatabaseTestUtil'
import { Event } from './Event'
import { Group } from './Group'
import { EVENT_TYPES } from '../../../../shared/definitions/EventTypes'

const testUtils = new DatabaseTestUtil()

async function createEventAndGroup() {
  const grpRepo = testUtils.getRepository(Group)
  const evtRepo = testUtils.getRepository(Event)

  const group = new Group()
  group.name = 'test'
  await grpRepo.save(group)

  const evt = new Event()
  evt.groups = [group]
  await evtRepo.save(evt)
  const event = (await evtRepo.findOne({ relations: ['groups'] })) as Event
  return { event, group, evtRepo, grpRepo }
}

describe(Event, () => {
  beforeAll(async () => await testUtils.connect())
  beforeEach(async () => await testUtils.dropAllTables())
  afterAll(async () => {
    await testUtils.dropAllTables()
    await testUtils.shutdown()
  })

  it('creates an event', async () => {
    const evt = new Event()
    evt.description = '1234'
    evt.imageUrl = 'http://url.com'

    const repo = testUtils.getRepository(Event)
    await repo.save(evt)
    const savedEvent = (await repo.findOne()) as Event

    expect(savedEvent).toBeInstanceOf(Event)
    expect(savedEvent).toEqual(
      expect.objectContaining(<Event>{
        id: expect.any(String),
        description: evt.description,
        imageUrl: evt.imageUrl,
        type: expect.stringMatching(EVENT_TYPES.COOP),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    )
  })

  it('does not remove event when group is removed', async () => {
    const { event, group, evtRepo, grpRepo } = await createEventAndGroup()
    expect(event.groups.length).toEqual(1)

    await grpRepo.remove(group)
    const grps = await grpRepo.find()
    expect(grps.length).toEqual(0)

    const afterRemoval = (await evtRepo.findOne({ relations: ['groups'] })) as Event
    expect(afterRemoval).toBeDefined()
    expect(afterRemoval.groups).toEqual([])
  })

  it('creates an event with group and cascade deletes', async () => {
    const { event, group, evtRepo, grpRepo } = await createEventAndGroup()

    expect(event).toBeDefined()
    expect(event.groups.length).toEqual(1)
    expect(event.groups[0].name).toBe(group.name)

    await evtRepo.remove(event)
    const grps = await grpRepo.find()
    expect(grps.length).toEqual(0)
  })
})
