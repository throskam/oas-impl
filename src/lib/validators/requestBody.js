import ContentValidator from './content'

const error = (rule) => ({
  rule,
  path: 'requestBody'
})

export default class RequestBodyValidator {
  constructor (requestBody, option) {
    this.requestBody = requestBody
    this.validator = requestBody.content ? new ContentValidator(requestBody.content, option) : null
  }

  validate ({ value, mediaType } = {}) {
    const errors = []

    if (value === undefined) {
      if (this.requestBody.required) {
        errors.push(error('requestBody-required'))
      }

      return errors
    }

    if (!this.validator) {
      return errors
    }

    return [
      ...errors,
      ...this.validator.validate({ value, mediaType }).map(error => ({
        ...error,
        path: 'requestBody.' + error.path
      }))
    ]
  }
}
