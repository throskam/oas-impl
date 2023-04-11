import deepClone from '../utils/deepClone'
import deepMerge from '../utils/deepMerge'

const castNumber = (val) => {
  const casted = Number(val)

  if (Number.isNaN(casted)) {
    throw new Error('Impossible to cast value into Number')
  }

  return casted
}

const casters = {
  integer: castNumber,
  number: castNumber,
  string: String,
  boolean: (val) => ['false', '0'].includes(val) ? false : [''].includes(val) ? true : Boolean(val)
}

export default class SchemaCoercer {
  constructor (schema) {
    this.schema = schema
  }

  coerce (payload) {
    return this.recursiveCoerce(this.schema, payload)
  }

  recursiveCoerce (schema, { value } = {}) {
    if (schema.nullable && value === null) {
      return value
    }

    if (schema.type === 'array') {
      if (!Array.isArray(value)) {
        // Cannot coerce a non-array value into an array.
        return value
      }

      return value.map(item => this.recursiveCoerce(schema.items, { value: item }))
    }

    if (schema.type === 'object') {
      if (typeof value !== 'object' && value !== undefined) {
        // Cannot coerce a non-object value into an object.
        // Ignore undefined since it could lead to default values.
        return value
      }

      const coerced = Object.keys(schema.properties).reduce((acc, property) => {
        const coerced = this.recursiveCoerce(schema.properties[property], { value: value ? value[property] : undefined })

        if (coerced !== undefined) {
          acc[property] = coerced
        }

        return acc
      }, {})

      const merged = deepMerge(deepClone(value), coerced)

      if (Object.keys(merged).length === 0) {
        return undefined
      }

      return merged
    }

    if (value === undefined) {
      return schema.default
    }

    /* eslint-disable-next-line valid-typeof */
    if (typeof value === schema.type) {
      return value
    }

    try {
      return casters[schema.type](value)
    } catch (e) {
      return value
    }
  }
}
