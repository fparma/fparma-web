import { CreateDateColumn, UpdateDateColumn } from 'typeorm'

export class Base {
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt!: Date
}
