import { generateId } from '../../../util/generateId'
import { Sides, Unit, Group } from '../../../util/sqmTypes'

export const createUnit = (side: Sides) =>
  ({
    id: generateId(),
    side: side,
    attrs: { description: '' },
    type: '',
  } as Unit)

export const createGroup = (side: Sides, units: number = 0) =>
  ({
    id: generateId(),
    side: side,
    name: '',
    units: Array.from(Array(units), () => createUnit(side)),
  } as Group)
