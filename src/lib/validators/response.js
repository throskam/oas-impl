const createHeadersValidator = require('./headers')
const createContentValidator = require('./content')

module.exports = (response, option) => {
  const headersValidator = response.headers ? createHeadersValidator(response.headers, option) : null
  const contentValidator = response.content ? createContentValidator(response.content, option) : null

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
