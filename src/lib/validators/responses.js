import ResponseValidator from './response'

export default class ResponsesValidator {
  constructor (responses, option) {
    this.responseValidators = Object.keys(responses).reduce((validators, status) => {
      validators[status] = new ResponseValidator(responses[status], option)
      return validators
    }, {})
  }

  validate ({ header, content, mediaType, status } = {}) {
    const wildcard = status ? status.toString().slice(0, 1) + 'XX' : undefined
    const validator = this.responseValidators[status] || this.responseValidators[wildcard] || this.responseValidators.default

    return validator
      ? validator.validate({ header, content, mediaType }).map(error => ({
        ...error,
        path: 'responses[' + status + '].' + error.path
      }))
      : []
  }
}
