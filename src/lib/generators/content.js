const mediaTypeMatcher = require('../utils/mediaTypeMatcher')
const createSchemaGenerator = require('./schema')

module.exports = (content, option) => {
  const mediaTypes = Object.keys(content)

  const generators = mediaTypes
    .filter(mediaType => content[mediaType].schema)
    .reduce((generators, mediaType) => {
      generators[mediaType] = createSchemaGenerator(content[mediaType].schema, option)
      return generators
    }, {})

  return ({ mediaType } = {}) => {
    const generator = generators[mediaTypeMatcher(mediaTypes, mediaType)]

    if (!generator) {
      return
    }

    return generators[mediaTypes]()
  }
}
