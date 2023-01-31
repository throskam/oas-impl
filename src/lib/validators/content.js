import mediaTypeMatcher from '../utils/mediaTypeMatcher'
import SchemaValidator from './schema'

export default class ContentValidator {
  constructor (content, option) {
    this.mediaTypes = Object.keys(content)

    this.validators = this.mediaTypes
      .filter(mediaType => content[mediaType].schema)
      .reduce((validators, mediaType) => {
        validators[mediaType] = new SchemaValidator(content[mediaType].schema, option)
        return validators
      }, {})

    this.error = (rule, value) => ({
      rule,
      path: 'content',
      value
    })
  }

  validate ({ value, mediaType } = {}) {
    const errors = []

    if (!mediaType) {
      errors.push(this.error('content-media-type-required', mediaType))
      return errors
    }

    if (!mediaTypeMatcher(this.mediaTypes, mediaType)) {
      errors.push(this.error('content-media-type-unsupported', mediaType))
      return errors
    }

    const validator = this.validators[mediaTypeMatcher(this.mediaTypes, mediaType)]

    if (!validator) {
      return errors
    }

    return [
      ...errors,
      ...validator.validate({ value }).map(error => ({
        ...error,
        path: 'content[' + mediaType + '].' + error.path
      }))
    ]
  }
}
