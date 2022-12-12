import createDispatcher from './dispatcher'

const meta = {
  openapi: '3.0.0',
  info: {
    title: 'Title',
    version: '1.0.0'
  }
}

const operation = (methods) => {
  return methods.reduce((operation, method) => {
    operation[method] = {
      responses: {
        default: {
          description: 'None'
        }
      }
    }
    return operation
  }, {})
}

describe('Empty paths', () => {
  const definition = {
    ...meta
  }

  const dispatch = createDispatcher(definition)

  it('should return an undefined route', () => {
    expect(dispatch('get', '/foo')).toBeUndefined()
  })
})

describe('Routing', () => {
  const definition = {
    ...meta,
    paths: {
      '/static': operation(['get']),
      '/templated/{param}': operation(['get']),
      '/complex/{param1}/complex/{param2}': operation(['get']),
      '/precedence/{param}': operation(['get']),
      '/precedence/static': operation(['get'])
    }
  }

  const dispatch = createDispatcher(definition)

  it('should resolve static path', () => {
    expect(dispatch('get', '/static').path).toEqual('/static')
  })

  it('should resolve templated path', () => {
    expect(dispatch('get', '/templated/param').path).toEqual('/templated/{param}')
  })

  it('should resolve comlexe templated path', () => {
    expect(dispatch('get', '/complex/param/complex/param').path).toEqual('/complex/{param1}/complex/{param2}')
  })

  it('should return the static route', () => {
    expect(dispatch('get', '/precedence/static').path).toEqual('/precedence/static')
  })

  it('should return the  dynamic route', () => {
    expect(dispatch('get', '/precedence/dynamic').path).toEqual('/precedence/{param}')
  })
})

describe('Parameters merging', () => {
  const definition = {
    ...meta,
    paths: {
      '/path': {
        parameters: [{
          name: 'common',
          in: 'path',
          schema: {
            type: 'integer'
          }
        }, {
          name: 'parent',
          in: 'query'
        }],
        get: {
          parameters: [{
            name: 'common',
            in: 'path',
            schema: {
              type: 'string'
            }
          }, {
            name: 'child',
            in: 'path'
          }]
        }
      }
    }
  }

  const dispatch = createDispatcher(definition)

  it('should override parent with child', () => {
    expect(dispatch('get', '/path').operation.parameters).toEqual(expect.arrayContaining([
      definition.paths['/path'].parameters[1],
      definition.paths['/path'].get.parameters[0],
      definition.paths['/path'].get.parameters[1]
    ]))
  })
})
