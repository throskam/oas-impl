const normalizeObjectKeys = require('../utils/normalizeObjectKeys')
const deepClone = require('../utils/deepClone')
const deepMerge = require('../utils/deepMerge')
const createParameterCoercer = require('./parameter')

module.exports = (parameters) => {
  const coercers = parameters.map(parameter => {
    const coercer = createParameterCoercer(parameter)
    const name = parameter.name

    return payload => ({ in: parameter.in, name, value: coercer({ value: payload[parameter.in] ? payload[parameter.in][name] : undefined }) })
  })

  return ({ path, query, header, cookie } = {}) => {
    const normalizedHeader = normalizeObjectKeys(header || {}, parameters.filter(parameter => parameter.in === 'header').map(parameter => parameter.name))

    const payload = {
      ...(path && { path }),
      ...(query && { query }),
      ...(header && { header: normalizedHeader }),
      ...(cookie && { cookie })
    }

    const coerced = coercers.reduce((acc, coercer) => {
      const coerced = coercer(payload)

      if (coerced.value === undefined) {
        return acc
      }

      acc[coerced.in] = {
        ...acc[coerced.in],
        [coerced.name]: coerced.value
      }

      return acc
    }, {})

    const merged = deepMerge(deepClone(payload), coerced)

    if (Object.keys(merged).length === 0) {
      return undefined
    }

    return merged
  }
}
