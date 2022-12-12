import normalizeObjectKeys from '../utils/normalizeObjectKeys'
import createParameterValidator from './parameter'

export default (headers, option) => {
  const validators = Object.keys(headers).map(name => {
    const validator = createParameterValidator({ ...headers[name], name }, option)

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
