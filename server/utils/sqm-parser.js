import armaClassParser from 'arma-class-parser'
import _ from 'lodash'

const SIDES_MAP = {
  WEST: 'blufor',
  EAST: 'opfor',
  INDEPENDENT: 'greenfor',
  CIVILIAN: 'civilian'
}
const sides = Object.keys(SIDES_MAP)

const translateSide = side => { return SIDES_MAP[side.toUpperCase()] || null }
const isOkSide = unit => { return (unit.side && sides.indexOf(unit.side.toUpperCase()) !== -1) || false }
const isPlayable = unit => { return (unit.dataType === 'Object' && unit.Attributes && unit.Attributes.isPlayable === 1 || unit.Attributes.isPlayer === 1) || false }
const parseGroupName = str => {
  str = str + ''
  let ret = ''
  // might be better with a regexp here
  let match = str.substr(str.toLowerCase().lastIndexOf('setgroupid'))
  if (match) {
    let semi = match.indexOf(';')
    // semicolon could be missing if last command
    match = match.substr(match.indexOf('[') + 1, (semi !== -1 ? semi : match.length))
    match = match.substr(0, match.lastIndexOf(']'))
    ret = match.replace(/['"]+/g, '')
  }

  return _.capitalize(ret.toLowerCase().trim())
}

export default function parseSqmString (str, callback) {
  if (!_.isString(str)) return callback(new Error('Expected SQM as string'))
  callback = callback || _.noop

  let ret = []
  try {
    var parsed = armaClassParser(str)
  } catch (e) {
    console.error(e)
    return callback(new Error('Failed to parse SQM. Make sure it is not binarized'))
  }

  let entities = parsed.Mission ? parsed.Mission.Entities : null
  if (!entities) return callback(new Error('Could not find any groups'))

  process.nextTick(() => {
    _.forOwn(entities, grp => {
      if (!_.isObject(grp)) return
      let group = {units: []}

      _.forOwn(grp.Entities, unit => {
        if (!_.isObject(unit) || !isOkSide(unit) || !isPlayable(unit)) return

        // the first unit seems to always be the leader in Eden
        if (!group.units.length) {
          group.side = translateSide(unit.side)
          group.name = parseGroupName(unit.Attributes.init)
        }

        group.units.push({
          description: _.escape(unit.Attributes.description || '').trim()
        })
      })

      if (group.units.length) {
        if (group.name) {
          let grpNameReg = new RegExp(group.name, 'i')
          group.units.forEach(unit => {
            let orig = unit.description
            if (!orig.toLowerCase().indexOf(group.name.toLowerCase())) {
              let desc = orig.replace(grpNameReg, '').trim()
              // don't want to replace unit desc if it's only the grpname e.g actual
              // and if it starts with parenthesis, keep the original
              unit.description = desc.indexOf('(') === 0 ? orig : (desc || orig)
            }
          })
        }
        ret.push(group)
      }
    })
    callback(null, ret)
  })
}
