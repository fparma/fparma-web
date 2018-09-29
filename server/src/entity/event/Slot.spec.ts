import { DatabaseTestUtil } from "../../test/DatabaseTestUtil";
import { Slot } from './Slot';
import { User } from '../User';

const testUtils = new DatabaseTestUtil();

describe(Slot, () => {

  beforeAll(async () => await testUtils.connect())
  beforeEach(async () => await testUtils.dropAllTables())
  afterAll(async () => {
    await testUtils.dropAllTables()
    await testUtils.shutdown()
  })

  it('saves a slot', async () => {
    const slotRepo = testUtils.getRepository(Slot)
    const slot = new Slot()
    slot.name = 'test'

    await slotRepo.save(slot)
    const savedSlot = await slotRepo.findOne() as Slot
    expect(savedSlot).toEqual(expect.objectContaining(<Slot>{
      id: expect.any(String),
      name: slot.name,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date)
    }))
  })

  it('saves a slot with a user and sets null on user deletion', async () => {
    const slotRepo = testUtils.getRepository(Slot)
    const userRepo = testUtils.getRepository(User);
    const slot = new Slot()
    slot.name = 'test'

    const user = new User()
    user.name = 'testuser'
    slot.user = user

    await userRepo.save(user)
    await slotRepo.save(slot)

    const savedSlot = await slotRepo.findOne() as Slot
    expect(savedSlot.name).toEqual(slot.name)
    expect(savedSlot.user.name).toEqual(user.name)

    await userRepo.remove(user)
    const slotAfterUserDelete = await slotRepo.findOne() as Slot
    expect(slotAfterUserDelete.user).toBeNull()

  })

})
