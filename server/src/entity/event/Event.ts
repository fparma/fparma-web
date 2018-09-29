import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { Group } from './Group';
import { User } from '../User';
import { Base } from '../Base';
import { EVENT_TYPES } from '../../../../shared/definitions/EventTypes';

@Entity('events')
export class Event extends Base {

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ name: 'image_url' })
    imageUrl!: string;

    @Column()
    description!: string;

    @Column({ type: 'enum', enum: EVENT_TYPES, default: EVENT_TYPES.COOP })
    type!: string;

    @Column({ type: 'timestamp', nullable: false })
    date!: Date

    @OneToMany(type => Group, group => group.event, { cascade: true, nullable: false })
    @JoinTable()
    groups!: Group[];

    @ManyToMany(type => User)
    @JoinTable()
    authors!: User[];
}
