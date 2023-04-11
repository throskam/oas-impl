import HeadersCoercer from './headers'
import ContentCoercer from './content'

export default class ResponseCoercer {
  constructor (response) {
    this.headersCoercer = response.headers ? new HeadersCoercer(response.headers) : null
    this.contentCoercer = response.content ? new ContentCoercer(response.content) : null
  }

  coerce ({ header, content, mediaType } = {}) {
    const response = {
      header: this.coerceHeader({ header }),
      content: this.coerceContent({ content, mediaType })
    }

    if (response.header === undefined) {
      delete response.header
    }

    if (response.content === undefined) {
      delete response.content
    }

    if (response.header === undefined && response.content === undefined) {
      return undefined
    }

    return response
  }

  coerceHeader ({ header }) {
    if (!this.headersCoercer) {
      return header
    }

    return this.headersCoercer.coerce({ header })
  }

  coerceContent ({ content, mediaType }) {
    if (!this.contentCoercer) {
      return content
    }

    return this.contentCoercer.coerce({ value: content, mediaType })
  }
}
