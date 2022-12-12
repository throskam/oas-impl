import createParametersValidator from './validators/parameters'
import createRequestBodyValidator from './validators/requestBody'

export default (operation, option) => {
  const parametersValidator = operation.parameters ? createParametersValidator(operation.parameters, option) : null
  const requestBodyValidator = operation.requestBody ? createRequestBodyValidator(operation.requestBody, option) : null

  return ({ path, query, header, cookie, content, mediaType } = {}) => {
    return [
      ...(parametersValidator ? parametersValidator({ path, query, header, cookie }) : []),
      ...(requestBodyValidator ? requestBodyValidator({ value: content, mediaType }) : [])
    ]
  }
}
