const createContentCoercer = require('./content')

module.exports = (requestBody) => {
  const coercer = requestBody.content ? createContentCoercer(requestBody.content) : null

  return ({ content, mediaType } = {}) => coercer ? coercer({ value: content, mediaType }) : content
}
