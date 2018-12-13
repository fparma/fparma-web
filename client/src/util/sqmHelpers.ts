import { parse } from 'arma-class-parser'
import { inspect } from 'util'
import * as R from 'ramda'
import { Sides, stringToSide, Groups } from './sqmTypes'

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
const isPropEq1 = (prop, unit) => R.equals(R.pathOr(0, ['attrs', prop], unit), 1)
const isPlayable = unit => isPropEq1('isPlayable', unit) || isPropEq1('isPlayer', unit)

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

export const getSidesAndGroups = (sqm: object): Groups[] =>
  R.pipe(
    getMission,
    getEntities,
    getGroups,
    mapGroupsAndUnits,
    R.filter(R.allPass([isValidSide, hasUnits]))
  )(sqm)
