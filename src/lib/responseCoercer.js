const createResponsesCoercer = require('./coercers/responses')

module.exports = (operation) => {
  const responsesCoercer = operation.responses ? createResponsesCoercer(operation.responses) : null

  return ({ header, content, mediaType, status } = {}) =>
    responsesCoercer
      ? responsesCoercer({ header, content, mediaType, status })
      : (header === undefined && content === undefined
          ? undefined
          : {
              ...(header && { header }),
              ...(content && { content })
            })
}
