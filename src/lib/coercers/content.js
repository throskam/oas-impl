import mediaTypeMatcher from '../utils/mediaTypeMatcher'
import SchemaCoercer from './schema'

export default class ContentCoercer {
  constructor (content) {
    this.mediaTypes = Object.keys(content)

    this.coercerByMediaType = this.mediaTypes
      .filter(mediaType => content[mediaType].schema)
      .reduce((coercers, mediaType) => {
        coercers[mediaType] = new SchemaCoercer(content[mediaType].schema)
        return coercers
      }, {})
  }

  coerce ({ value, mediaType } = {}) {
    const coercer = this.coercerByMediaType[mediaTypeMatcher(this.mediaTypes, mediaType)]

    if (!coercer) {
      return value
    }

    return coercer.coerce({ value })
  }
}
