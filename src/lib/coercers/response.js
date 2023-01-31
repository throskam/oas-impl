import HeadersCoercer from './headers'
import ContentCoercer from './content'

export default class ResponseCoercer {
  constructor (response) {
    this.headersCoercer = response.headers ? new HeadersCoercer(response.headers) : null
    this.contentCoercer = response.content ? new ContentCoercer(response.content) : null
  }

  coerce ({ header, content, mediaType } = {}) {
    const headers = this.headersCoercer ? this.headersCoercer.coerce({ header }) : header
    const body = this.contentCoercer ? this.contentCoercer.coerce({ value: content, mediaType }) : content

    if (headers === undefined && body === undefined) {
      return undefined
    }

    return {
      ...(headers !== undefined && { header: headers }),
      ...(body !== undefined && { content: body })
    }
  }
}
