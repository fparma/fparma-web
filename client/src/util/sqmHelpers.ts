import { parse } from 'arma-class-parser'
import * as R from 'ramda'

export const parseSqm = (sqm: string): object => {
  return parse(sqm)
}

enum Sides {
  Blufor = 'blufor',
  Opfor = 'opfor',
  Independent = 'independent',
  Civilian = 'civilian',
}

const stringToSide = (side: string = ''): Sides | null =>
  ({
    west: Sides.Blufor,
    east: Sides.Opfor,
    independent: Sides.Independent,
    civilian: Sides.Civilian,
  }[side.toLowerCase()] || null)

const getMission = R.propOr({}, 'Mission')
const getEntities = R.propOr({}, 'Entities')

const getMissionEntities = R.pipe(
  getMission,
  getEntities
)

export const getSidesAndGroups = (sqm: object) => {
  const entities = getMissionEntities(sqm)
  return entities
}
