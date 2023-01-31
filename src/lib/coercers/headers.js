import deepClone from '../utils/deepClone'
import deepMerge from '../utils/deepMerge'
import normalizeObjectKeys from '../utils/normalizeObjectKeys'
import ParameterCoercer from './parameter'

export default class HeadersCoercer {
  constructor (headers) {
    this.headers = headers
    this.coercers = Object.keys(this.headers).map(name => {
      // TODO: create header coercer
      const coercer = new ParameterCoercer({ ...headers[name], name })

      return header => ({ name, value: coercer.coerce({ value: header[name] }) })
    })
  }

  coerce ({ header = {} } = {}) {
    const normalizedHeader = normalizeObjectKeys(header, Object.keys(this.headers))

    const coerced = this.coercers.reduce((acc, coercer) => {
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
