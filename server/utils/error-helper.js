import util from 'util'
import _ from 'lodash'

const messages = {
  'required': '%s is required.',
  'min': '%s below minimum.',
  'max': '%s above maximum.',
  'enum': '%s not an allowed value.'
}

export default function helper (err, makeUnique) {
  if (err.name !== 'ValidationError') return [err.message]
  let errors = []

  _.each(_.keys(err.errors), field => {
    var eObj = err.errors[field]

    if (!messages[eObj.kind]) {
      let str = _.capitalize(eObj.message)
      if (eObj.value && _.includes(['maxlength', 'minlength'], eObj.value)) {
        str += ` (${eObj.value})`
      }
      errors.push(str)
    }
    else errors.push(_.capitalize(util.format(messages[eObj.kind], eObj.path)))
  })

  return makeUnique ? _.uniq(errors) : errors
}
