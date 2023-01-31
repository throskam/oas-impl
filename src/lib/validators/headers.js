import normalizeObjectKeys from '../utils/normalizeObjectKeys'
import ParameterValidator from './parameter'

export default class Headers {
  constructor (headers, option) {
    this.headers = headers
    this.validators = Object.keys(headers).map(name => {
      const validator = new ParameterValidator({ ...headers[name], name }, option)

      return header => validator.validate({ value: header[name] }).map(error => ({ ...error, path: error.path.replace('parameter', 'header') }))
    })
  }

  validate ({ header = {} } = {}) {
    const normalizedHeader = normalizeObjectKeys(header, Object.keys(this.headers))

    return this.validators.map(validator => validator(normalizedHeader)).flat().map(error => ({
      ...error,
      path: 'headers.' + error.path
    }))
  }
}
