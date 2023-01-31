import ParametersValidator from './validators/parameters'
import RequestBodyValidator from './validators/requestBody'

export default class RequestValidator {
  constructor (operation, option) {
    this.parametersValidator = operation.parameters ? new ParametersValidator(operation.parameters, option) : null
    this.requestBodyValidator = operation.requestBody ? new RequestBodyValidator(operation.requestBody, option) : null
  }

  validate ({ path, query, header, cookie, content, mediaType } = {}) {
    return [
      ...(this.parametersValidator ? this.parametersValidator.validate({ path, query, header, cookie }) : []),
      ...(this.requestBodyValidator ? this.requestBodyValidator.validate({ value: content, mediaType }) : [])
    ]
  }
}
