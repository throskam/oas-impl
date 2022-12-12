import createResponsesGenerator from './generators/responses'

export default (operation, option) => {
  const responsesGenerator = operation.responses ? createResponsesGenerator(operation.responses, option) : null

  return payload => responsesGenerator ? responsesGenerator(payload) : undefined
}
