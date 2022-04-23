const createContentCoercer = require('./content')
const createSchemaCoercer = require('./schema')
const createParameterParser = require('./../utils/parameterParser')

const createFirstContentCoercer = (content) => {
  const mediaType = Object.keys(content)[0]
  const coercer = createContentCoercer(content)

  return ({ value }) => coercer({ value, mediaType })
}

module.exports = (parameter) => {
  const coercer = parameter.content
    ? createFirstContentCoercer(parameter.content)
    : parameter.schema
      ? createSchemaCoercer(parameter.schema)
      : null

  const parser = createParameterParser(parameter)

  return ({ value } = {}) => {
    if (value === undefined) {
      return value
    }

    const parsed = parser(value)

    return coercer ? coercer({ value: parsed }) : parsed
  }
}
