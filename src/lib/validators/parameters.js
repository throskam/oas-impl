import normalizeObjectKeys from '../utils/normalizeObjectKeys'
import ParameterValidator from './parameter'

export default class ParametersValidator {
  constructor (parameters, option) {
    this.parameters = parameters
    this.validators = parameters.map(parameter => {
      const validator = new ParameterValidator(parameter, option)
      const name = parameter.name

      return payload => validator.validate({ value: payload[parameter.in][name] })
    })
  }

  validate ({ path = {}, query = {}, header = {}, cookie = {} } = {}) {
    const payload = {
      path,
      query,
      header: normalizeObjectKeys(header, this.parameters.filter(parameter => parameter.in === 'header').map(parameter => parameter.name)),
      cookie
    }

    return this.validators.map(validator => validator(payload)).flat().map(error => ({
      ...error,
      path: 'parameters.' + error.path
    }))
  }
}
