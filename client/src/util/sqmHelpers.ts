import { parse } from 'arma-class-parser'
import { inspect } from 'util'
import * as R from 'ramda'

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

const getUnits = R.pipe(
  getEntities,
  R.filter(isSqmObject),
  R.values
)

const mapGroupsAndUnits = R.map(grp => {
  const units = R.map(unit => {
    return {
      sqmId: unit.id,
      type: unit.type,
      side: stringToSide(unit.side),
      attrs: getAttributes(unit),
      customAttrs: getCustomAttributes(unit),
    }
  }, getUnits(grp))

  return {
    sqmId: grp.id,
    side: stringToSide(grp.side),
    units,
    attrs: getCustomAttributes(grp),
  }
})

export const parseSqm = (sqm: string): object => {
  return parse(sqm)
}

export const getSidesAndGroups = (sqm: object) => {
  const groups = R.pipe(
    getMission,
    getEntities,
    getGroups,
    mapGroupsAndUnits
  )(sqm)
  console.log(inspect(groups, { depth: 5 }))
}
