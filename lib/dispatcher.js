const diff = (a, b) => a.filter(x => !b.some(y => y.in === x.in && y.name === x.name))

module.exports = (definition) => {
  const methods = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace']
  const paths = definition.paths || {}

  const routes = Object.keys(paths).map(path => {
    return Object.keys(paths[path]).filter(method => methods.includes(method)).map(method => {
      return {
        definition,
        path,
        method,
        operation: {
          ...paths[path][method],
          // Merge operation parameter with path parameters.
          parameters: [
            ...diff(paths[path].parameters || [], paths[path][method].parameters || []),
            ...(paths[path][method].parameters || [])
          ]
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
