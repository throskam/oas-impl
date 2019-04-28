const createResponseGenerator = require('./response')

module.exports = (responses, option) => {
  const responseGenerators = Object.keys(responses).reduce((generators, status) => {
    generators[status] = createResponseGenerator(responses[status], option)
    return generators
  }, {})

  return ({ mediaType, status } = {}) => {
    const wildcard = status ? status.toString().slice(0, 1) + 'XX' : undefined

    const generator = responseGenerators[status] ||
      responseGenerators[wildcard] ||
      responseGenerators['default'] ||
      responseGenerators[Object.keys(responseGenerators)[0]]

    return generator ? generator({ mediaType }) : undefined
  }
}
