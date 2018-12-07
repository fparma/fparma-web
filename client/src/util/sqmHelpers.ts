import { parse } from 'arma-class-parser'
import { inspect } from 'util'
import * as R from 'ramda'

enum Sides {
  BLUFOR = 'blufor',
  OPFOR = 'opfor',
  INDEPENDENT = 'independent',
  CIVILIAN = 'civilian',
}

const stringToSide = (side: string = ''): Sides | null =>
  ({
    west: Sides.BLUFOR,
    east: Sides.OPFOR,
    independent: Sides.INDEPENDENT,
    civilian: Sides.CIVILIAN,
  }[side.toLowerCase()] || null)

const getMission = R.propOr({}, 'Mission')
const getEntities = R.propOr({}, 'Entities')

const isSqmGroup = R.whereEq({ dataType: 'Group' })
const isSqmLayer = R.whereEq({ dataType: 'Layer' })
const isSqmObject = R.whereEq({ dataType: 'Object' })

const getMissionGroups = R.pipe(
  R.filter(isSqmGroup),
  R.values
)

const getLayerGroups = R.pipe(
  R.filter(isSqmLayer),
  R.values,
  R.map(getEntities),
  R.values,
  R.chain(R.filter(isSqmGroup)),
  R.map(R.values),
  R.flatten
)

const getGroups = entities => R.concat(getMissionGroups(entities), getLayerGroups(entities))

const getAttributes = R.propOr({}, 'Attributes')
const valueProp = R.path(['data', 'value'])
const getCustomAttributes = R.pipe(
  R.propOr({}, 'CustomAttributes'),
  R.values,
  R.filter(R.is(Object)),
  R.map(({ property, expression, Value }) => ({ property, expression, value: valueProp(Value) }))
)

const sideValues = R.values(Sides)
const isValidSide = obj => R.includes(R.prop('side', obj), sideValues)
const isPlayable = unit => R.equals(R.pathOr(0, ['attrs', 'isPlayable'], unit), 1)

const getUnits = R.pipe(
  getEntities,
  R.filter(isSqmObject),
  R.values,
  R.map(unit => ({
    sqmId: unit.id,
    type: unit.type,
    side: stringToSide(unit.side),
    attrs: getAttributes(unit),
    customAttrs: getCustomAttributes(unit),
  })),
  R.filter(R.allPass([isValidSide, isPlayable]))
)

const mapGroupsAndUnits = R.map(grp => ({
  sqmId: grp.id,
  side: stringToSide(grp.side),
  units: getUnits(grp),
  attrs: getCustomAttributes(grp),
}))

export const parseSqm = (sqm: string): object => {
  return parse(sqm)
}

const hasUnits = R.pipe(
  R.propOr([], 'units'),
  R.complement(R.isEmpty)
)

interface Unit {
  sqmId: number
  type: string
  side: Sides
  customAttrs: Attributes[]
  attrs: {
    description: string | undefined
    isPlayable: 0 | 1
  }
}

interface Attributes {
  property: string | undefined
  expression: string | undefined
  value: string | number | undefined
}

interface Groups {
  sqmId: number
  side: Sides
  units: Unit[]
  attrs: Attributes[]
}

export const getSidesAndGroups = (sqm: object): Groups[] => {
  const groups = R.pipe(
    getMission,
    getEntities,
    getGroups,
    mapGroupsAndUnits,
    R.filter(R.allPass([isValidSide, hasUnits]))
  )(sqm)
  console.log(inspect(groups, { depth: 5 }))
  console.log(groups.length)
  return groups
}
