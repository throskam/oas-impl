import createResponsesValidator from './validators/responses'

export default (operation, option) => {
  const responsesValidator = operation.responses ? createResponsesValidator(operation.responses, option) : null

  return payload => responsesValidator ? responsesValidator(payload) : []
}
