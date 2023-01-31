import mediaTypeMatcher from '../utils/mediaTypeMatcher'
import SchemaGenerator from './schema'

export default class ContentGenerator {
  constructor (content, option) {
    this.mediaTypes = Object.keys(content)

    this.generators = this.mediaTypes
      .filter(mediaType => content[mediaType].schema)
      .reduce((generators, mediaType) => {
        generators[mediaType] = new SchemaGenerator(content[mediaType].schema, option)
        return generators
      }, {})
  }

  generate ({ mediaType } = {}) {
    const generator = this.generators[mediaTypeMatcher(this.mediaTypes, mediaType)]

    if (!generator) {
      return
    }

    return generator.generate()
  }
}
