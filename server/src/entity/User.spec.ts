import { User } from './User'
import { DatabaseTestUtil } from '../test/DatabaseTestUtil'
import { APP_ROLES } from '../../../shared/definitions/AppRoles'

const testUtils = new DatabaseTestUtil()

describe.only(User, () => {
  beforeAll(async () => await testUtils.connect())
  beforeEach(async () => await testUtils.dropAllTables())
  afterAll(async () => {
    await testUtils.dropAllTables()
    await testUtils.shutdown()
  })

  it('saves a user', async () => {
    const user = new User()
    user.steamId = '1234'
    user.name = '1238471890a'

    const repo = testUtils.getRepository(User)
    await repo.save(user)
    const savedUser = (await repo.findOne()) as User

    expect(savedUser).toBeInstanceOf(User)
    expect(savedUser).toEqual(
      expect.objectContaining(<User>{
        id: expect.any(String),
        steamId: user.steamId,
        name: user.name,
        banned: false,
        role: expect.stringMatching(APP_ROLES.USER),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    )
  })
})
