const createContentGenerator = require('./content')
const createSchemaGenerator = require('./schema')

const createFirstContentGenerator = (content, option) => {
  const mediaType = Object.keys(content)[0]
  const generator = createContentGenerator(content, option)

  return () => generator({ mediaType })
}

module.exports = (parameter, option) => {
  const generator = parameter.content ? createFirstContentGenerator(parameter.content, option)
    : parameter.schema ? createSchemaGenerator(parameter.schema, option)
      : null

  return () => generator ? generator() : undefined
}
