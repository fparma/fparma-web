import { createConnection, Connection, ConnectionOptions } from 'typeorm'
import { Config } from '../Config'

export class DatabaseTestUtil {
  private connection!: Connection
  constructor() {
    if (!Config.isTestEnv()) {
      throw new Error('Not running in test mode')
    }
  }

  async connect() {
    if (this.connection) return
    this.connection = await createConnection({
      type: 'mariadb',
      host: Config.get('APP_TEST_DB_HOST'),
      port: parseInt(Config.get('APP_TEST_DB_PORT'), 10),
      username: Config.get('APP_TEST_DB_USER'),
      password: Config.get('APP_TEST_DB_PASSWORD'),
      database: Config.get('APP_TEST_DB_DATABASE_NAME'),
      synchronize: true,
      logging: ['info', 'warn', 'error'],
      ...Config.getDatabasePaths(),
    })
  }

  getRepository(type: Function) {
    const manager = this.connection.manager
    return manager.getRepository(type)
  }

  async shutdown() {
    try {
      if (this.connection.isConnected) await this.connection.close()
    } catch (err) {
      console.error('Failed to disconnect', err)
      throw err
    }
  }

  async dropAllTables() {
    try {
      await this.connection.dropDatabase()
      await this.connection.synchronize()
    } catch (err) {
      console.error('Failed to drop tables', err)
      throw err
    }
  }
}
