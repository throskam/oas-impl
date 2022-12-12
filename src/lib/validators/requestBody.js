import createContentValidator from './content'

const error = (rule) => ({
  rule,
  path: 'requestBody'
})

export default (requestBody, option) => {
  const validator = requestBody.content ? createContentValidator(requestBody.content, option) : null

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
