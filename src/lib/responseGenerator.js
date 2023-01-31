import ResponsesGenerator from './generators/responses'

export default class ResponseGenerator {
  constructor (operation, option) {
    this.responsesGenerator = operation.responses ? new ResponsesGenerator(operation.responses, option) : null
  }

  generate (payload) {
    return this.responsesGenerator ? this.responsesGenerator.generate(payload) : undefined
  }
}
