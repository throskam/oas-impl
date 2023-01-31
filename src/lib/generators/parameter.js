import ContentGenerator from './content'
import SchemaGenerator from './schema'

const createFirstContentGenerator = (content, option) => {
  const mediaType = Object.keys(content)[0]
  const generator = new ContentGenerator(content, option)

  return () => generator.generate({ mediaType })
}

export default class ParameterGenerator {
  constructor (parameter, option) {
    this.generator = parameter.content
      ? createFirstContentGenerator(parameter.content, option)
      : parameter.schema
        ? (payload) => new SchemaGenerator(parameter.schema, option).generate(payload)
        : null
  }

  generate () {
    return this.generator ? this.generator() : undefined
  }
}
