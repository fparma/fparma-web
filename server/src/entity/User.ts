import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

import { APP_ROLES } from '../../../shared/definitions/AppRoles'
import { Base } from './Base'

@Entity('users')
export class User extends Base {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ name: 'steam_id', unique: true })
  steamId!: string

  @Column({ name: 'steam_name' })
  steamName!: string

  @Column({ unique: true, nullable: false })
  name!: string

  @Column({ type: 'enum', enum: APP_ROLES, default: APP_ROLES.USER })
  role!: APP_ROLES

  @Column({ default: false })
  banned!: boolean
}
