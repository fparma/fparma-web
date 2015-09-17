/* Parses uploaded sqm files for units. Returns JSON*/

import armaClassParser from 'arma-class-parser'
import _ from 'lodash'

const SIDE_TRANSLATE_MAP = {
  WEST: 'blufor',
  EAST: 'opfor',
  GUER: 'greenfor',
  CIV: 'civilian'
}
const ALLOWED_SIDES = _.keys(SIDE_TRANSLATE_MAP)
const PLAYABLE_TYPES = ['PLAY CDG', 'PLAYER COMMANDER']

let isAllowedSide = str => _.includes(ALLOWED_SIDES, (str + '').toUpperCase())
let isPlayerSlot = str => _.includes(PLAYABLE_TYPES, (str + '').toUpperCase())
let translateSide = str => SIDE_TRANSLATE_MAP[(str + '').toUpperCase()] || null
let parseGroupName = str => {
  str = str + ''
  let ret = ''
  // might be better with a regexp here
  let match = str.substr(str.toLowerCase().lastIndexOf('setgroupid'))
  if (match) {
    // semicolon could be missing if last command
    let semi = match.indexOf(';')
    match = match.substr(match.indexOf('[') + 1, (semi !== -1 ? semi : match.length))
    match = match.substr(0, match.lastIndexOf(']'))
    ret = match.replace(/['"]+/g, '')
  }

  return _.capitalize(ret.toLowerCase().trim())
}

export default function (sqmFileString, callback) {
  if (!_.isString(sqmFileString)) {
    return callback(new Error('Expected SQM in string format'))
  }
  callback = callback || function () {}
  let ret = []
  let parsed

  try {
    parsed = armaClassParser(sqmFileString)
  } catch (e) {
    return callback(new Error('SQM file could not be parsed'))
  }

  // empty sqm?
  if (!parsed.Mission || !parsed.Mission.Groups) {
    return callback(new Error('Could not find any groups'))
  }

  process.nextTick(() => {
    _.forOwn(parsed.Mission.Groups, val => {
      if (_.isEmpty(val.Vehicles) || !isAllowedSide(val.side)) return

      let grp = {units: []}
      _.forOwn(val.Vehicles, unit => {
        if (_.isEmpty(unit) || !isAllowedSide(unit.side)) return

        if (unit.leader) {
          grp.side = translateSide(unit.side)
          grp.name = _.escape(parseGroupName(unit.init) || '')
        }

        if (!isPlayerSlot(unit.player)) return

        grp.units.push({
          description: _.escape(unit.description).trim()
        })
      })

      if (grp.units.length) {
        if (grp.name) {
          let grpNameReg = new RegExp(grp.name, 'i')
          grp.units.forEach(unit => {
            let orig = unit.description
            if (!orig.toLowerCase().indexOf(grp.name.toLowerCase())) {
              let desc = orig.replace(grpNameReg, '').trim()
              // OR orig because we don't want to replace unit desc if it's only the grpname e.g actual
              unit.description = desc || orig
            }
          })
        }
        ret.push(grp)
      }
    })

    callback(null, ret)
  })
}
