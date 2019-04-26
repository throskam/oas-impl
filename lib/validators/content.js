const mediaTypeMatcher = require('../utils/mediaTypeMatcher')
const createSchemaValidator = require('./schema')

module.exports = (content, option) => {
  const mediaTypes = Object.keys(content)

  const validators = mediaTypes
    .filter(mediaType => content[mediaType].schema)
    .reduce((validators, mediaType) => {
      validators[mediaType] = createSchemaValidator(content[mediaType].schema, option)
      return validators
    }, {})

  const error = (rule, value) => ({
    rule,
    path: 'content',
    value
  })

  return ({ value, mediaType } = {}) => {
    const errors = []

    if (!mediaType) {
      errors.push(error('content-media-type-required', mediaType))
      return errors
    }

    if (!mediaTypeMatcher(mediaTypes, mediaType)) {
      errors.push(error('content-media-type-unsupported', mediaType))
      return errors
    }

    const validator = validators[mediaTypeMatcher(mediaTypes, mediaType)]

    if (!validator) {
      return errors
    }

    return [
      ...errors,
      ...validator({ value }).map(error => ({
        ...error,
        path: 'content[' + mediaType + '].' + error.path
      }))
    ]
  }
}
