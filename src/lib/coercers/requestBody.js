import createContentCoercer from './content'

export default (requestBody) => {
  const coercer = requestBody.content ? createContentCoercer(requestBody.content) : null

  return ({ content, mediaType } = {}) => coercer ? coercer({ value: content, mediaType }) : content
}
