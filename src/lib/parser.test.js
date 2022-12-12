import createParser from './parser'

describe('Dereference', () => {
  const definition = {
    openapi: '3.0.0',
    info: {
      title: 'Title',
      version: '1.0.0'
    },
    paths: {
      '/path': {
        get: {
          responses: {
            default: {
              $ref: '#/components/responses/foo'
            }
          }
        }
      }
    },
    components: {
      responses: {
        foo: {
          description: 'None',
          content: {
            'application/json': {
              schema: {
                type: 'integer'
              }
            }
          }
        }
      }
    }
  }

  const dereferenced = {
    openapi: '3.0.0',
    info: {
      title: 'Title',
      version: '1.0.0'
    },
    paths: {
      '/path': {
        get: {
          responses: {
            default: {
              description: 'None',
              content: {
                'application/json': {
                  schema: {
                    type: 'integer'
                  }
                }
              }
            }
          }
        }
      }
    },
    components: {
      responses: {
        foo: {
          description: 'None',
          content: {
            'application/json': {
              schema: {
                type: 'integer'
              }
            }
          }
        }
      }
    }
  }

  const parser = createParser()

  it('should dereference', () => {
    return expect(parser(definition)).resolves.toEqual(dereferenced)
  })
})

describe('Parse', () => {
  const definition = {
    openapi: '3.0.0',
    info: {
      version: '1.0.0'
    },
    paths: {
      '/path': {
        get: {
          responses: {
            default: {
              description: 'None'
            }
          }
        }
      }
    }
  }

  const parser = createParser()

  it('should throw a validation error when missing title', () => {
    expect.assertions(1)

    return expect(parser(definition)).rejects.toBeDefined()
  })
})
