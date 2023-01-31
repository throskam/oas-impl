import ContentCoercer from './content'

export default class RequestBodyCoercer {
  constructor (requestBody) {
    this.coercer = requestBody.content ? new ContentCoercer(requestBody.content) : null
  }

  coerce ({ content, mediaType } = {}) {
    return this.coercer ? this.coercer.coerce({ value: content, mediaType }) : content
  }
}
