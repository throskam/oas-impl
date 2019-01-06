const createResponsesValidator = require('./validators/responses')

module.exports = (operation) => {
  const responsesValidator = operation.responses ? createResponsesValidator(operation.responses) : null

  return payload => responsesValidator ? responsesValidator(payload) : []
}
