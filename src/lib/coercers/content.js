import mediaTypeMatcher from '../utils/mediaTypeMatcher'
import createSchemaCoercer from './schema'

export default (content) => {
  const mediaTypes = Object.keys(content)

  const coercers = mediaTypes
    .filter(mediaType => content[mediaType].schema)
    .reduce((coercers, mediaType) => {
      coercers[mediaType] = createSchemaCoercer(content[mediaType].schema)
      return coercers
    }, {})

  return ({ value, mediaType } = {}) => {
    const coercer = coercers[mediaTypeMatcher(mediaTypes, mediaType)]

    if (!coercer) {
      return value
    }

    return coercer({ value })
  }
}
