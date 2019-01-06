const createContentValidator = require('./content')

const error = (rule) => ({
  rule,
  path: 'requestBody'
})

module.exports = (requestBody) => {
  const validator = requestBody.content ? createContentValidator(requestBody.content) : null

  return ({ value, mediaType } = {}) => {
    const errors = []

    if (value === undefined) {
      if (requestBody.required) {
        errors.push(error('requestBody-required'))
      }

      return errors
    }

    if (!validator) {
      return errors
    }

    return [
      ...errors,
      ...validator({ value, mediaType }).map(error => ({
        ...error,
        path: 'requestBody.' + error.path
      }))
    ]
  }
}
