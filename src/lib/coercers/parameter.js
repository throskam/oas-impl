const createContentCoercer = require('./content')
const createSchemaCoercer = require('./schema')

const createFirstContentCoercer = (content) => {
  const mediaType = Object.keys(content)[0]
  const coercer = createContentCoercer(content)

  return ({ value }) => coercer({ value, mediaType })
}

module.exports = (parameter) => {
  const coercer = parameter.content ? createFirstContentCoercer(parameter.content)
    : parameter.schema ? createSchemaCoercer(parameter.schema)
      : null

  return ({ value } = {}) => coercer ? coercer({ value }) : value
}
