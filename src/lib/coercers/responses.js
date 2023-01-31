import ResponseCoercer from './response'

export default class ResponsesCoercer {
  constructor (responses) {
    this.responseCoercers = Object.keys(responses).reduce((coercers, status) => {
      coercers[status] = new ResponseCoercer(responses[status])
      return coercers
    }, {})
  }

  coerce ({ header, content, mediaType, status } = {}) {
    const wildcard = status ? status.toString().slice(0, 1) + 'XX' : undefined
    const coercer = this.responseCoercers[status] || this.responseCoercers[wildcard] || this.responseCoercers.default

    if (!coercer) {
      if (header === undefined && content === undefined) {
        return undefined
      }

      return {
        ...(header && { header }),
        ...(content && { content })
      }
    }

    return coercer.coerce({ header, content, mediaType })
  }
}
