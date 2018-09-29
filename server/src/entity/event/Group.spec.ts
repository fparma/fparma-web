import { DatabaseTestUtil } from "../../test/DatabaseTestUtil";
import { Group } from './Group';
import { EVENT_TYPES } from '../../../../shared/definitions/EventTypes';
import { Slot } from './Slot';

const testUtils = new DatabaseTestUtil();

async function createGroupAndSlot() {
  const grpRepo = testUtils.getRepository(Group);
  const slotRepo = testUtils.getRepository(Slot);
  const group = new Group();
  group.name = 'group';

  const slot = new Slot()
  slot.group = group;
  slot.name = 'slot'

  group.slots = [slot]
  await grpRepo.save(group)
  return { group, slot, grpRepo, slotRepo }
}

describe(Group, () => {

  beforeAll(async () => await testUtils.connect())
  beforeEach(async () => await testUtils.dropAllTables())
  afterAll(async () => {
    await testUtils.dropAllTables()
    await testUtils.shutdown()
  })

  it('saves a group', async () => {
    const { group, grpRepo } = await createGroupAndSlot()
    const savedGroup = await grpRepo.findOne() as Group
    expect(savedGroup.name).toEqual(group.name)
  })

  it('saves a group with a slot and cascade deletes', async () => {
    const { group, grpRepo, slot, slotRepo } = await createGroupAndSlot()
    const savedGroup = await grpRepo.findOne({ relations: ['slots'] }) as Group
    expect(savedGroup.name).toEqual(group.name)
    expect(savedGroup.slots.length).toBe(1)
    expect(savedGroup.slots[0].name).toEqual(slot.name)

    await grpRepo.remove(savedGroup)
    const slots = await slotRepo.find()
    expect(slots).toEqual([])
  })

  it('removes a slot from the group if deleted', async () => {
    const { group, grpRepo, slot, slotRepo } = await createGroupAndSlot()
    const savedGroup = await grpRepo.findOne({ relations: ['slots'] }) as Group
    
    expect(group.slots.length).toEqual(1)
    await slotRepo.remove(slot)
    const groupAfterSlotRemove = await grpRepo.findOne({ relations: ['slots'] }) as Group
    expect(groupAfterSlotRemove.slots).toEqual([])
  })
})
