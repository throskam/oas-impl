const createHeadersValidator = require('./headers')
const createContentValidator = require('./content')

module.exports = (response) => {
  const headersValidator = response.headers ? createHeadersValidator(response.headers) : null
  const contentValidator = response.content ? createContentValidator(response.content) : null

  return ({ header, content, mediaType } = {}) => {
    return [
      ...(headersValidator ? headersValidator({ header }) : []),
      ...(contentValidator ? contentValidator({ value: content, mediaType }) : [])
    ].map(error => ({
      ...error,
      path: 'response.' + error.path
    }))
  }
}
