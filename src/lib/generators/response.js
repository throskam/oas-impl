import createHeadersGenerator from './headers'
import createContentGenerator from './content'

export default (response, option) => {
  const headersGenerator = response.headers ? createHeadersGenerator(response.headers, option) : null
  const contentGenerator = response.content ? createContentGenerator(response.content, option) : null

  return payload => {
    const header = headersGenerator ? headersGenerator() : undefined
    const content = contentGenerator ? contentGenerator(payload) : undefined

    if (header === undefined && content === undefined) {
      return undefined
    }

    return {
      ...(header && { header }),
      ...(content && { content })
    }
  }
}
