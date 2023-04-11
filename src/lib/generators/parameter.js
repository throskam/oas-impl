import ContentGenerator from './content'
import SchemaGenerator from './schema'

export default class ParameterGenerator {
  constructor (parameter, option) {
    this.parameter = parameter

    if (parameter.content) {
      this.generator = new ContentGenerator(parameter.content, option)
    } else if (parameter.schema) {
      this.generator = new SchemaGenerator(parameter.schema, option)
    }
  }

  generate () {
    if (!this.generator) {
      return undefined
    }

    if (this.parameter.content) {
      return this.generator.generate({ mediaType: Object.keys(this.parameter.content)[0] })
    }

    return this.generator.generate()
  }
}
