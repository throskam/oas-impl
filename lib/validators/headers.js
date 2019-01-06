const normalizeObjectKeys = require('../utils/normalizeObjectKeys')
const createParameterValidator = require('./parameter')

module.exports = (headers) => {
  const validators = Object.keys(headers).map(name => {
    const validator = createParameterValidator({ ...headers[name], name })

    return header => validator({ value: header[name] }).map(error => ({ ...error, path: error.path.replace('parameter', 'header') }))
  })

  return ({ header = {} } = {}) => {
    const normalizedHeader = normalizeObjectKeys(header, Object.keys(headers))

    return validators.map(validator => validator(normalizedHeader)).flat().map(error => ({
      ...error,
      path: 'headers.' + error.path
    }))
  }
}
