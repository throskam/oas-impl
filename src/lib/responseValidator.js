const createResponsesValidator = require('./validators/responses')

module.exports = (operation, option) => {
  const responsesValidator = operation.responses ? createResponsesValidator(operation.responses, option) : null

  return payload => responsesValidator ? responsesValidator(payload) : []
}
