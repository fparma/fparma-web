import { Entity, OneToOne, PrimaryGeneratedColumn, Column, LessThan, JoinTable, JoinColumn } from 'typeorm'
import { Base } from './Base'
import { User } from './User'

@Entity('comments')
export class Comment extends Base {
  @PrimaryGeneratedColumn('uuid')
  id!: number

  @OneToOne(type => User, { eager: true })
  @JoinColumn()
  author!: User

  @Column()
  text!: string
}
