import ResponsesValidator from './validators/responses'

export default class ResponseValidator {
  constructor (operation, option) {
    this.responsesValidator = operation.responses ? new ResponsesValidator(operation.responses, option) : null
  }

  validate (payload) {
    return this.responsesValidator ? this.responsesValidator.validate(payload) : []
  }
}
