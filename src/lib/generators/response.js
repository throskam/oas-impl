import HeadersGenerator from './headers'
import ContentGenerator from './content'

export default class ResponseGenerator {
  constructor (response, option) {
    this.headersGenerator = response.headers ? new HeadersGenerator(response.headers, option) : null
    this.contentGenerator = response.content ? new ContentGenerator(response.content, option) : null
  }

  generate (payload) {
    const header = this.headersGenerator ? this.headersGenerator.generate() : undefined
    const content = this.contentGenerator ? this.contentGenerator.generate(payload) : undefined

    if (header === undefined && content === undefined) {
      return undefined
    }

    return {
      ...(header && { header }),
      ...(content && { content })
    }
  }
}
