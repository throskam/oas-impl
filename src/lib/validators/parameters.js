import normalizeObjectKeys from '../utils/normalizeObjectKeys'
import createParameterValidator from './parameter'

export default (parameters, option) => {
  const validators = parameters.map(parameter => {
    const validator = createParameterValidator(parameter, option)
    const name = parameter.name

    return payload => validator({ value: payload[parameter.in][name] })
  })

  return ({ path = {}, query = {}, header = {}, cookie = {} } = {}) => {
    const payload = {
      path,
      query,
      header: normalizeObjectKeys(header, parameters.filter(parameter => parameter.in === 'header').map(parameter => parameter.name)),
      cookie
    }

    return validators.map(validator => validator(payload)).flat().map(error => ({
      ...error,
      path: 'parameters.' + error.path
    }))
  }
}
