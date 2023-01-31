import RequestCoercer from './requestCoercer'
import RequestValidator from './requestValidator'
import ResponseCoercer from './responseCoercer'
import ResponseGenerator from './responseGenerator'
import ResponseValidator from './responseValidator'

const diff = (a, b) => a.filter(x => !b.some(y => y.in === x.in && y.name === x.name))

export default (definition, option = {}) => {
  const methods = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace']
  const paths = definition.paths || {}

  const routes = Object.keys(paths).map(path => {
    return Object.keys(paths[path]).filter(method => methods.includes(method)).map(method => {
      const operation = {
        ...paths[path][method],
        // Merge operation parameter with path parameters.
        parameters: [
          ...diff(paths[path].parameters || [], paths[path][method].parameters || []),
          ...(paths[path][method].parameters || [])
        ]
      }

      const requestCoercer = new RequestCoercer(operation)
      const requestValidator = new RequestValidator(operation, option)
      const responseCoercer = new ResponseCoercer(operation)
      const responseGenerator = new ResponseGenerator(operation, option)
      const responseValidator = new ResponseValidator(operation, option)

      return {
        path,
        method,
        definition,
        operation,
        impl: {
          requestCoercer: (payload) => requestCoercer(payload),
          requestValidator: (payload) => requestValidator(payload),
          responseCoercer: (payload) => responseCoercer(payload),
          responseGenerator: (payload) => responseGenerator(payload),
          responseValidator: (payload) => responseValidator(payload)
        }
      }
    })
  }).flat()

  return (method, path) => {
    const candidates = routes.filter(route => route.method === method)

    // Exact match then templated path.
    return candidates.find(route => route.path === path) || candidates.find(route => {
      return path.match(new RegExp('^' + route.path.replace(/\{.*?\}/g, '[^/]+') + '$', 'g'))
    })
  }
}
