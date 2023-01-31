import HeadersValidator from './headers'
import ContentValidator from './content'

export default class ResponseValidator {
  constructor (response, option) {
    this.headersValidator = response.headers ? new HeadersValidator(response.headers, option) : null
    this.contentValidator = response.content ? new ContentValidator(response.content, option) : null
  }

  validate ({ header, content, mediaType } = {}) {
    return [
      ...(this.headersValidator ? this.headersValidator.validate({ header }) : []),
      ...(this.contentValidator ? this.contentValidator.validate({ value: content, mediaType }) : [])
    ].map(error => ({
      ...error,
      path: 'response.' + error.path
    }))
  }
}
