import ResponseGenerator from './response'

export default class ResponsesGenerator {
  constructor (responses, option) {
    this.responseGenerators = Object.keys(responses).reduce((generators, status) => {
      generators[status] = new ResponseGenerator(responses[status], option)
      return generators
    }, {})
  }

  generate ({ mediaType, status } = {}) {
    const wildcard = status ? status.toString().slice(0, 1) + 'XX' : undefined

    const generator = this.responseGenerators[status] ||
      this.responseGenerators[wildcard] ||
      this.responseGenerators.default

    return generator ? generator.generate({ mediaType }) : undefined
  }
}
