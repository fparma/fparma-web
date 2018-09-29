import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { Base } from '../Base';
import { Slot } from './Slot';
import { Event } from './Event';

@Entity('groups')
export class Group extends Base {

    @PrimaryGeneratedColumn('uuid')
    id!: number;

    @Column({ nullable: false })
    name!: string;

    @ManyToOne(type => Event, event => event.groups, { onDelete: 'CASCADE' })
    event!: Event;

    @OneToMany(type => Slot, slot => slot.group, { cascade: true })
    @JoinColumn()
    slots!: Slot[]
}

