import { AbstractRepository, createQueryBuilder, EntityRepository } from 'typeorm'
import { Event } from '../entity/event/Event'

@EntityRepository(Event)
export class EventRepository extends AbstractRepository<Event> {
  getEventList(options = { paginationStart: 0, paginationEnd: 20 }) {
    return createQueryBuilder(Event)
      .orderBy('date', 'DESC')
      .skip(options.paginationStart)
      .take(options.paginationEnd)
      .getMany()
  }

  findFullEventById(id: string) {
    return this.repository.findOne(id, { relations: ['groups', 'groups.slots'] }).then(event => (event ? event : null))
  }
}
