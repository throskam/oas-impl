import createResponseCoercer from './response'

export default (responses) => {
  const responseCoercers = Object.keys(responses).reduce((coercers, status) => {
    coercers[status] = createResponseCoercer(responses[status])
    return coercers
  }, {})

  return ({ header, content, mediaType, status } = {}) => {
    const wildcard = status ? status.toString().slice(0, 1) + 'XX' : undefined
    const coercer = responseCoercers[status] || responseCoercers[wildcard] || responseCoercers.default

    if (!coercer) {
      if (header === undefined && content === undefined) {
        return undefined
      }

      return {
        ...(header && { header }),
        ...(content && { content })
      }
    }

    return coercer({ header, content, mediaType })
  }
}
