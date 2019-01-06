const createResponseValidator = require('./response')

module.exports = (responses) => {
  const responseValidators = Object.keys(responses).reduce((validators, status) => {
    validators[status] = createResponseValidator(responses[status])
    return validators
  }, {})

  return ({ header, content, mediaType, status } = {}) => {
    const wildcard = status ? status.toString().slice(0, 1) + 'XX' : undefined
    const validator = responseValidators[status] || responseValidators[wildcard] || responseValidators['default']

    return validator ? validator({ header, content, mediaType }).map(error => ({
      ...error,
      path: 'responses[' + status + '].' + error.path
    })) : []
  }
}
