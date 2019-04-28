const deepClone = require('../utils/deepClone')
const deepMerge = require('../utils/deepMerge')
const normalizeObjectKeys = require('../utils/normalizeObjectKeys')
const createParameterCoercer = require('./parameter')

module.exports = (headers) => {
  const coercers = Object.keys(headers).map(name => {
    const coercer = createParameterCoercer({ ...headers[name], name })

    return header => ({ name, value: coercer({ value: header[name] }) })
  })

  return ({ header = {} } = {}) => {
    const normalizedHeader = normalizeObjectKeys(header, Object.keys(headers))

    const coerced = coercers.reduce((acc, coercer) => {
      const coerced = coercer(normalizedHeader)

      if (coerced.value === undefined) {
        return acc
      }

      acc[coerced.name] = coerced.value

      return acc
    }, {})

    const merged = deepMerge(deepClone(normalizedHeader), coerced)

    if (Object.keys(merged).length === 0) {
      return undefined
    }

    return merged
  }
}
