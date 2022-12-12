import createHeadersValidator from './headers'
import createContentValidator from './content'

export default (response, option) => {
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
