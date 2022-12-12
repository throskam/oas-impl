import requestCoercer from './requestCoercer'
import requestValidator from './requestValidator'
import responseCoercer from './responseCoercer'
import responseGenerator from './responseGenerator'
import responseValidator from './responseValidator'

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

      return {
        path,
        method,
        definition,
        operation,
        impl: {
          requestCoercer: requestCoercer(operation),
          requestValidator: requestValidator(operation, option),
          responseCoercer: responseCoercer(operation),
          responseGenerator: responseGenerator(operation, option),
          responseValidator: responseValidator(operation, option)
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
