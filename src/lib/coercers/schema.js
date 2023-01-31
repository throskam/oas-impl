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

  coerce ({ value } = {}) {
    if (this.schema.nullable && value === null) {
      return value
    }

    if (this.schema.type === 'array') {
      if (!Array.isArray(value)) {
        // Cannot coerce a non-array value into an array.
        return value
      }

      return value.map(item => new SchemaCoercer(this.schema.items).coerce({ value: item }))
    }

    if (this.schema.type === 'object') {
      if (typeof value !== 'object' && value !== undefined) {
        // Cannot coerce a non-object value into an object.
        // Ignore undefined since it could lead to default values.
        return value
      }

      const coerced = Object.keys(this.schema.properties).reduce((acc, property) => {
        const coerced = new SchemaCoercer(this.schema.properties[property]).coerce({ value: value ? value[property] : undefined })

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
      return this.schema.default
    }

    /* eslint-disable-next-line valid-typeof */
    if (typeof value === this.schema.type) {
      return value
    }

    try {
      return casters[this.schema.type](value)
    } catch (e) {
      return value
    }
  }
}
