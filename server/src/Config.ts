import dotenv from 'dotenv'
import { resolve, join } from 'path'

interface IConfig {
  APP_PORT: string

  APP_DB_TYPE: string

  APP_DB_HOST: string
  APP_DB_PORT: string
  APP_DB_USER: string
  APP_DB_PASSWORD: string
  APP_DB_DATABASE_NAME: string

  APP_TEST_DB_HOST: string
  APP_TEST_DB_PORT: string
  APP_TEST_DB_USER: string
  APP_TEST_DB_PASSWORD: string
  APP_TEST_DB_DATABASE_NAME: string
}

const { parsed: cfg } = dotenv.config({
  path: resolve(__dirname, '..', 'config', '.env'),
})

export class Config {
  static get(key: keyof IConfig, def?: any): string {
    if (!cfg || !cfg[key]) throw new Error('Non existing config')
    return cfg[key] || def
  }

  static isTestEnv() {
    return process.env['NODE_ENV'] === 'test'
  }

  static ROOT_PATH = resolve(__dirname)

  static getDatabasePaths() {
    return {
      entities: [join(this.ROOT_PATH, '/entity/**/*.ts')],
      migrations: [join(this.ROOT_PATH, '/migration/**/*.ts')],
      subscribers: [join(this.ROOT_PATH, '/subscriber/**/*.ts')],
      cli: {
        entitiesDir: join(this.ROOT_PATH, '/entity'),
        migrationsDir: join(this.ROOT_PATH, '/migration'),
        subscribersDir: join(this.ROOT_PATH, '/subscriber'),
      },
    }
  }
}
