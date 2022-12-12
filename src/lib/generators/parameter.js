import createContentGenerator from './content'
import createSchemaGenerator from './schema'

const createFirstContentGenerator = (content, option) => {
  const mediaType = Object.keys(content)[0]
  const generator = createContentGenerator(content, option)

  return () => generator({ mediaType })
}

export default (parameter, option) => {
  const generator = parameter.content
    ? createFirstContentGenerator(parameter.content, option)
    : parameter.schema
      ? createSchemaGenerator(parameter.schema, option)
      : null

  return () => generator ? generator() : undefined
}
