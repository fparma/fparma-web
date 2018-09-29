import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Base } from '../Base';
import { Group } from './Group';
import { User } from '../User';

@Entity('slots')
export class Slot extends Base {

    @PrimaryGeneratedColumn('uuid')
    id!: number;

    @Column({ nullable: false })
    name!: string;

    @ManyToOne(type => Group, group => group.slots, { onDelete: 'CASCADE' })
    group!: Group;

    @OneToOne(type => User, {onDelete: 'SET NULL', eager: true})
    @JoinColumn()
    user!: User
}
