const createSchemaCoercer = require('./schema')

describe('Boolean', () => {
  const schema = {
    type: 'boolean',
    default: true
  }

  const coercer = createSchemaCoercer(schema)

  it('should return the value when valid', () => {
    const payload = { value: true }
    const expected = true
    expect(coercer(payload)).toEqual(expected)
  })

  it('should return the coerce value', () => {
    const payload = { value: 'anything' }
    const expected = true
    expect(coercer(payload)).toEqual(expected)
  })

  it('should return true when the value is an empty string', () => {
    const payload = { value: '' }
    const expected = true
    expect(coercer(payload)).toEqual(expected)
  })

  it('should return false when the value is "false"', () => {
    const payload = { value: 'false' }
    const expected = false
    expect(coercer(payload)).toEqual(expected)
  })

  it('should return false when the value is "0"', () => {
    const payload = { value: '0' }
    const expected = false
    expect(coercer(payload)).toEqual(expected)
  })

  it('should return the default when the value is missing', () => {
    const expected = true
    expect(coercer()).toEqual(expected)
  })
})

describe('String', () => {
  const schema = {
    type: 'string',
    default: 'default'
  }

  const coercer = createSchemaCoercer(schema)

  it('should return the value when valid', () => {
    const payload = { value: 'string' }
    const expected = 'string'
    expect(coercer(payload)).toEqual(expected)
  })

  it('should return the coerce value', () => {
    const payload = { value: 42 }
    const expected = '42'
    expect(coercer(payload)).toEqual(expected)
  })

  it('should return the default when the value is missing', () => {
    const expected = 'default'
    expect(coercer()).toEqual(expected)
  })
})

describe('Integer', () => {
  const schema = {
    type: 'integer',
    default: 0
  }

  const coercer = createSchemaCoercer(schema)

  it('should return the value when valid', () => {
    const payload = { value: 1 }
    const expected = 1
    expect(coercer(payload)).toEqual(expected)
  })

  it('should return the coerce value', () => {
    const payload = { value: '1' }
    const expected = 1
    expect(coercer(payload)).toEqual(expected)
  })

  it('should return the intial value when the coercion fails', () => {
    const payload = { value: 'string' }
    const expected = 'string'
    expect(coercer(payload)).toEqual(expected)
  })

  it('should return the default when the value is missing', () => {
    const expected = 0
    expect(coercer()).toEqual(expected)
  })
})

describe('Number', () => {
  const schema = {
    type: 'number',
    default: 0.0
  }

  const coercer = createSchemaCoercer(schema)

  it('should return the value when valid', () => {
    const payload = { value: 1.0 }
    const expected = 1.0
    expect(coercer(payload)).toEqual(expected)
  })

  it('should return the coerce value', () => {
    const payload = { value: '1.0' }
    const expected = 1.0
    expect(coercer(payload)).toEqual(expected)
  })

  it('should return the intial value when the coercion fails', () => {
    const payload = { value: 'string' }
    const expected = 'string'
    expect(coercer(payload)).toEqual(expected)
  })

  it('should return the default when the value is missing', () => {
    const expected = 0.0
    expect(coercer()).toEqual(expected)
  })
})

describe('Object', () => {
  describe('Properties', () => {
    const schema = {
      type: 'object',
      properties: {
        prop: {
          type: 'integer'
        }
      }
    }

    const coercer = createSchemaCoercer(schema)

    it('should return the value when valid', () => {
      const payload = { value: { prop: 1 } }
      const expected = { prop: 1 }
      expect(coercer(payload)).toStrictEqual(expected)
    })

    it('should return the coerce value', () => {
      const payload = { value: { prop: '1' } }
      const expected = { prop: 1 }
      expect(coercer(payload)).toStrictEqual(expected)
    })

    it('should return the intial value when the coercion fails', () => {
      const payload = { value: { prop: 'string' } }
      const expected = { prop: 'string' }
      expect(coercer(payload)).toStrictEqual(expected)
    })
  })

  describe('Recursive properties', () => {
    const schema = {
      type: 'object',
      properties: {
        parent: {
          type: 'object',
          properties: {
            child: {
              type: 'integer'
            }
          }
        }
      }
    }

    const coercer = createSchemaCoercer(schema)

    it('should return the value when valid', () => {
      const payload = { value: { parent: { child: 1 } } }
      const expected = { parent: { child: 1 } }
      expect(coercer(payload)).toStrictEqual(expected)
    })

    it('should return the coerce value', () => {
      const payload = { value: { parent: { child: '1' } } }
      const expected = { parent: { child: 1 } }
      expect(coercer(payload)).toStrictEqual(expected)
    })

    it('should return the intial value when the coercion fails', () => {
      const payload = { value: { parent: { child: 'string' } } }
      const expected = { parent: { child: 'string' } }
      expect(coercer(payload)).toStrictEqual(expected)
    })
  })

  describe('Property default', () => {
    const schema = {
      type: 'object',
      properties: {
        prop: {
          type: 'integer'
        },
        parent: {
          type: 'object',
          properties: {
            child: {
              type: 'integer',
              default: 0
            },
            prop: {
              type: 'integer'
            }
          }
        }
      }
    }

    const coercer = createSchemaCoercer(schema)

    it('should return the default only when there is one', () => {
      const expected = { parent: { child: 0 } }
      expect(coercer()).toStrictEqual(expected)
    })
  })

  describe('Additional properties', () => {
    const schema = {
      type: 'object',
      properties: {
        array: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              prop: {
                type: 'integer',
                default: 0
              }
            }
          }
        }
      }
    }

    const coercer = createSchemaCoercer(schema)

    it('should return additional value with the coerced value', () => {
      const payload = { value: { array: [{ myProp: 1 }, { prop: '1', myProp: 0 }] } }
      const expected = { array: [{ myProp: 1, prop: 0 }, { prop: 1, myProp: 0 }] }
      expect(coercer(payload)).toStrictEqual(expected)
    })
  })

  describe('Uncoercable', () => {
    const schema = {
      type: 'object',
      properties: {
        prop: {
          type: 'integer'
        }
      }
    }

    const coercer = createSchemaCoercer(schema)

    it('should return the orginal value when a non object is given', () => {
      const payload = { value: 'string' }
      const expected = 'string'
      expect(coercer(payload)).toEqual(expected)
    })
  })
})

describe('Array', () => {
  describe('Iterate', () => {
    const schema = {
      type: 'array',
      items: {
        type: 'integer'
      }
    }

    const coercer = createSchemaCoercer(schema)

    it('should return the value when valid', () => {
      const payload = { value: [1, 2, 3] }
      const expected = [1, 2, 3]
      expect(coercer(payload)).toStrictEqual(expected)
    })

    it('should return the coerce value', () => {
      const payload = { value: ['1', '2', '3'] }
      const expected = [1, 2, 3]
      expect(coercer(payload)).toStrictEqual(expected)
    })

    it('should return the intial value when the coercion fails', () => {
      const payload = { value: ['a', 'b', 'c'] }
      const expected = ['a', 'b', 'c']
      expect(coercer(payload)).toStrictEqual(expected)
    })
  })

  describe('Default item', () => {
    const schema = {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          prop: {
            type: 'integer',
            default: 0
          }
        }
      }
    }

    const coercer = createSchemaCoercer(schema)

    it('should return default value when the value is missing', () => {
      const payload = { value: [{}, undefined, { other: 1 }] }
      const expected = [{ prop: 0 }, { prop: 0 }, { prop: 0, other: 1 }]
      expect(coercer(payload)).toStrictEqual(expected)
    })
  })

  describe('Additional values', () => {
    const schema = {
      type: 'array',
      items: {
        type: 'integer'
      }
    }

    const coercer = createSchemaCoercer(schema)

    it('should return additional values with coerced value', () => {
      const payload = { value: ['a', '1'] }
      const expected = ['a', 1]
      expect(coercer(payload)).toStrictEqual(expected)
    })
  })
})

describe('Undefined', () => {
  describe('Basic', () => {
    const schema = {
      type: 'integer'
    }

    const coercer = createSchemaCoercer(schema)

    it('should return undefined when the value is missing', () => {
      expect(coercer()).toBeUndefined()
    })
  })

  describe('Object', () => {
    const schema = {
      type: 'object',
      properties: {
        prop: {
          type: 'integer'
        }
      }
    }

    const coercer = createSchemaCoercer(schema)

    it('should return undefined when the value is missing', () => {
      expect(coercer()).toBeUndefined()
    })
  })

  describe('Array', () => {
    const schema = {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          prop: {
            type: 'integer'
          }
        }
      }
    }

    const coercer = createSchemaCoercer(schema)

    it('should return undefined when the value is missing', () => {
      expect(coercer()).toBeUndefined()
    })
  })
})

describe('Nullable', () => {
  describe('Pod', () => {
    const schema = {
      type: 'string',
      nullable: true
    }

    const coercer = createSchemaCoercer(schema)

    it('should return null when the value is null', () => {
      const payload = { value: null }
      expect(coercer(payload)).toBeNull()
    })
  })

  describe('Object', () => {
    const schema = {
      type: 'object',
      nullable: true,
      properties: {
        prop: {
          type: 'integer'
        }
      }
    }

    const coercer = createSchemaCoercer(schema)

    it('should return null when the value is null', () => {
      const payload = { value: null }
      expect(coercer(payload)).toBeNull()
    })
  })
})
