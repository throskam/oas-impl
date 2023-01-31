import ResponsesCoercer from './coercers/responses'

export default class ResponseCoercer {
  constructor (operation) {
    this.responsesCoercer = operation.responses ? new ResponsesCoercer(operation.responses) : null
  }

  coerce ({ header, content, mediaType, status } = {}) {
    return this.responsesCoercer
      ? this.responsesCoercer.coerce({ header, content, mediaType, status })
      : (header === undefined && content === undefined
          ? undefined
          : {
              ...(header && { header }),
              ...(content && { content })
            })
  }
}
