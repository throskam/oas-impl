const createParametersValidator = require('./validators/parameters')
const createRequestBodyValidator = require('./validators/requestBody')

module.exports = (operation) => {
  const parametersValidator = operation.parameters ? createParametersValidator(operation.parameters) : null
  const requestBodyValidator = operation.requestBody ? createRequestBodyValidator(operation.requestBody) : null

  return ({ path, query, header, cookie, content, mediaType } = {}) => {
    return [
      ...(parametersValidator ? parametersValidator({ path, query, header, cookie }) : []),
      ...(requestBodyValidator ? requestBodyValidator({ value: content, mediaType }) : [])
    ]
  }
}
