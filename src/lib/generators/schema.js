const deepMerge = require('../utils/deepMerge')
const clamp = require('../utils/clamp')

const generate = (schema, option) => {
  if (option.format && option.format[schema.format] && option.format[schema.format].generator) {
    return option.format[schema.format].generator(schema, option)
  }

  if (schema.allOf) {
    return generate(schema.allOf.reduce(deepMerge, {}), option)
  }

  if (schema.anyOf) {
    return generate(schema.anyOf[0], option)
  }

  if (schema.oneOf) {
    return generate(schema.oneOf[0], option)
  }

  if (schema.example !== undefined) {
    return schema.example
  }

  if (schema.default !== undefined) {
    return schema.default
  }

  if (schema.enum) {
    return schema.enum[0]
  }

  if (schema.type === 'null') {
    return null
  }

  if (schema.type === 'boolean') {
    return true
  }

  if (schema.type === 'integer') {
    const minimum = schema.minimum === undefined ? Number.MIN_SAFE_INTEGER
      : schema.exclusiveMinimum ? schema.minimum + 1
        : schema.minimum

    const maximum = schema.minimum === undefined ? Number.MAX_SAFE_INTEGER
      : schema.exclusiveMaximum ? schema.maximum + 1
        : schema.maximum

    if (schema.multipleOf) {
      return clamp(
        0,
        Math.ceil(minimum / schema.multipleOf) * schema.multipleOf,
        Math.floor(maximum / schema.multipleOf) * schema.multipleOf
      )
    }

    return clamp(0, minimum, maximum)
  }

  if (schema.type === 'number') {
    const minimum = schema.minimum === undefined ? -Number.MAX_VALUE : schema.minimum
    const maximum = schema.minimum === undefined ? Number.MAX_SAFE_INTEGER : schema.maximum

    if (schema.multipleOf) {
      return clamp(
        0,
        Math.ceil(minimum / schema.multipleOf) * schema.multipleOf,
        Math.floor(maximum / schema.multipleOf) * schema.multipleOf
      )
    }

    return clamp(0, minimum, maximum)
  }

  if (schema.type === 'string') {
    const formats = {
      'date-time': '1970-01-01T00:00:00.000Z',
      email: 'email@example.com',
      hostname: 'example.com',
      ipv4: '127.0.0.1',
      ipv6: '::1',
      uri: 'https://example.com/path',
      uriref: '/path#anchor'
    }

    if (formats[schema.format]) {
      return formats[schema.format]
    }

    let string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

    const minLength = schema.minLength === undefined ? 0 : schema.minLength

    while (string.length < minLength) {
      string = string.concat(' ' + string)
    }

    const maxLength = schema.maxLength === undefined ? string.length : schema.maxLength

    if (string.length <= maxLength) {
      return string
    }

    return string.slice(0, maxLength - 3).concat('...')
  }

  if (schema.type === 'object') {
    const maxProperties = schema.maxProperties === undefined ? Object.keys(schema.properties).length : schema.maxProperties

    return Object.keys(schema.properties).slice(0, maxProperties).reduce((acc, key) => {
      if (schema.properties[key].writeOnly) {
        return acc
      }

      const value = generate(schema.properties[key], option)

      acc[key] = value
      return acc
    }, {})
  }

  if (schema.type === 'array') {
    let schemas = schema.items.anyOf ? schema.items.anyOf : [schema.items]

    const minItems = schema.minItems === undefined ? 0 : schema.minItems

    while (schemas.length < minItems) {
      schemas = schemas.concat(schemas)
    }

    const maxItems = schema.maxItems === undefined ? schemas.length : schema.maxItems

    return schemas.slice(0, maxItems).map(schema => generate(schema, option)).filter(item => item !== undefined)
  }

  return undefined
}

module.exports = (schema, option = {}) => {
  return () => generate(schema, option)
}
