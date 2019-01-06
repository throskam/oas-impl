const createResponsesGenerator = require('./generators/responses')

module.exports = (operation, option) => {
  const responsesGenerator = operation.responses ? createResponsesGenerator(operation.responses, option) : null

  return payload => responsesGenerator ? responsesGenerator(payload) : undefined
}
