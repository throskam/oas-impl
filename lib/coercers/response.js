const createHeadersCoercer = require('./headers')
const createContentCoercer = require('./content')

module.exports = (response) => {
  const headersCoercer = response.headers ? createHeadersCoercer(response.headers) : null
  const contentCoercer = response.content ? createContentCoercer(response.content) : null

  return ({ header, content, mediaType } = {}) => {
    const headers = headersCoercer ? headersCoercer({ header }) : header
    const body = contentCoercer ? contentCoercer({ value: content, mediaType }) : content

    //  TODO: rewrite
    if (headers === undefined && body === undefined) {
      return undefined
    }

    return {
      ...(headers !== undefined && { header: headers }),
      ...(body !== undefined && { content: body })
    }
  }
}
