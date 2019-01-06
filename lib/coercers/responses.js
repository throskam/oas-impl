const createResponseCoercer = require('./response')

module.exports = (responses) => {
  const responseCoercers = Object.keys(responses).reduce((coercers, status) => {
    coercers[status] = createResponseCoercer(responses[status])
    return coercers
  }, {})

  return ({ header, content, mediaType, status } = {}) => {
    const wildcard = status ? status.toString().slice(0, 1) + 'XX' : undefined
    const coercer = responseCoercers[status] || responseCoercers[wildcard] || responseCoercers['default']

    // TODO: rewrite
    return coercer ? coercer({ header, content, mediaType }) : (header === undefined && content === undefined ? undefined : {
      ...(header && { header }),
      ...(content && { content })
    })
  }
}
