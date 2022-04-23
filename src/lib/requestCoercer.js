const createParametersCoercer = require('./coercers/parameters')
const createRequestBodyCoercer = require('./coercers/requestBody')

module.exports = (operation) => {
  const parametersCoercer = operation.parameters ? createParametersCoercer(operation.parameters) : null
  const requestBodyCoercer = operation.requestBody ? createRequestBodyCoercer(operation.requestBody) : null

  return ({ path, query, header, cookie, content, mediaType } = {}) => {
    const body = requestBodyCoercer ? requestBodyCoercer({ content, mediaType }) : content

    const coerced = {
      ...(parametersCoercer
        ? parametersCoercer({ path, query, header, cookie })
        : {
            ...(path && { path }),
            ...(query && { query }),
            ...(header && { header }),
            ...(cookie && { cookie })
          }),
      ...(body !== undefined && { content: body })
    }

    if (Object.keys(coerced).length === 0) {
      return undefined
    }

    return coerced
  }
}
