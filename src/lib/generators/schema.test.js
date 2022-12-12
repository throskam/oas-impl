import createSchemaGenerator from './schema'

describe('Empty', () => {
  const schema = {}

  const generator = createSchemaGenerator(schema)

  it('should return undefined when schema is empty', () => {
    expect(generator()).toBeUndefined()
  })
})

describe('Example', () => {
  const schema = {
    example: 1
  }

  const generator = createSchemaGenerator(schema)

  it('should return the example value', () => {
    const expected = 1
    expect(generator()).toEqual(expected)
  })
})

describe('Default', () => {
  const schema = {
    default: 0
  }

  const generator = createSchemaGenerator(schema)

  it('should return the default value', () => {
    const expected = 0
    expect(generator()).toEqual(expected)
  })
})

describe('AllOf', () => {
  const schema = {
    allOf: [{
      type: 'integer'
    }, {
      example: 1
    }]
  }

  const generator = createSchemaGenerator(schema)

  it('should return the combined schema generated value', () => {
    const expected = 1
    expect(generator()).toEqual(expected)
  })
})

describe('AnyOf', () => {
  const schema = {
    anyOf: [{
      example: 1
    }, {
      example: 2
    }]
  }

  const generator = createSchemaGenerator(schema)

  it('should return the first schema generated value', () => {
    const expected = 1
    expect(generator()).toEqual(expected)
  })
})

describe('OneOf', () => {
  const schema = {
    oneOf: [{
      example: 1
    }, {
      example: 2
    }]
  }

  const generator = createSchemaGenerator(schema)

  it('should return the first schema generated value', () => {
    const expected = 1
    expect(generator()).toEqual(expected)
  })
})

describe('Generator', () => {
  const schema = {
    format: 'custom'
  }

  const generator = createSchemaGenerator(schema, {
    format: {
      custom: {
        generator: () => 1
      }
    }
  })

  it('should return the generated value', () => {
    const expected = 1
    expect(generator()).toEqual(expected)
  })
})

describe('Sample', () => {
  describe('Enum', () => {
    const schema = {
      enum: [1, 2]
    }

    const generator = createSchemaGenerator(schema)

    it('should return the first enum value', () => {
      const expected = schema.enum[0]
      expect(generator()).toEqual(expected)
    })
  })

  describe('Null', () => {
    const schema = {
      type: 'null'
    }

    const generator = createSchemaGenerator(schema)

    it('should return null', () => {
      expect(generator()).toBeNull()
    })
  })

  describe('Boolean', () => {
    const schema = {
      type: 'boolean'
    }

    const generator = createSchemaGenerator(schema)

    it('should return true', () => {
      const expected = true
      expect(generator()).toEqual(expected)
    })
  })

  describe('Integer', () => {
    describe('Basic', () => {
      const schema = {
        type: 'integer'
      }

      const generator = createSchemaGenerator(schema)

      it('should return 0', () => {
        const expected = 0
        expect(generator()).toEqual(expected)
      })
    })

    describe('Minimum & Maximum', () => {
      const schema = {
        type: 'integer',
        minimum: 0,
        maximum: 10
      }

      const generator = createSchemaGenerator(schema)

      it('should return the closest integer from 0 in between the minimum and maximum', () => {
        const expected = 0
        expect(generator()).toEqual(expected)
      })
    })

    describe('ExclusiveMinimum & ExclusiveMaximum', () => {
      const schema = {
        type: 'integer',
        minimum: 0,
        exclusiveMinimum: true,
        maximum: 10,
        exclusiveMaximum: true
      }

      const generator = createSchemaGenerator(schema)

      it('should return the closest integer from 0 in between the excl. minimum and excl. maximum', () => {
        const expected = 1
        expect(generator()).toEqual(expected)
      })
    })

    describe('MultipleOf', () => {
      const schema = {
        type: 'integer',
        minimum: 10,
        multipleOf: 13
      }

      const generator = createSchemaGenerator(schema)

      it('should return the closest integer from 10 multiple of 13', () => {
        const expected = 13
        expect(generator()).toEqual(expected)
      })
    })
  })

  describe('Number', () => {
    describe('Basic', () => {
      const schema = {
        type: 'number'
      }

      const generator = createSchemaGenerator(schema)

      it('should return a number', () => {
        const expected = 0
        expect(generator()).toEqual(expected)
      })
    })

    describe('Minimum & Maximum', () => {
      const schema = {
        type: 'number',
        minimum: 0.5,
        maximum: 10.5
      }

      const generator = createSchemaGenerator(schema)

      it('should return the closest number from 0 in between the minimum and maximum', () => {
        const expected = 0.5
        expect(generator()).toEqual(expected)
      })
    })

    describe('MultipleOf', () => {
      const schema = {
        type: 'number',
        minimum: 10.5,
        multipleOf: 11.5
      }

      const generator = createSchemaGenerator(schema)

      it('should return the closest number from 10 multiple of 13', () => {
        const expected = 11.5
        expect(generator()).toEqual(expected)
      })
    })
  })

  describe('String', () => {
    describe('Basic', () => {
      const schema = {
        type: 'string'
      }

      const generator = createSchemaGenerator(schema)

      it('should return a string', () => {
        const expected = expect.any(String)
        expect(generator()).toEqual(expected)
      })
    })

    describe('MinLength & MaxLength', () => {
      const schema = {
        type: 'string',
        minLength: 200,
        maxLength: 200
      }

      const generator = createSchemaGenerator(schema)

      it('should return a string with a length of 200', () => {
        const expected = 200
        expect(generator().length).toEqual(expected)
      })
    })

    describe('Formats', () => {
      const schema = {
        type: 'string',
        format: 'hostname'
      }

      const generator = createSchemaGenerator(schema)

      it('should return a string with the hostname format', () => {
        const expected = 'example.com'
        expect(generator()).toEqual(expected)
      })
    })
  })

  describe('Object', () => {
    describe('Basic', () => {
      const schema = {
        type: 'object',
        properties: {
          foo: {
            type: 'string'
          }
        }
      }

      const generator = createSchemaGenerator(schema)

      it('should return an object', () => {
        const expected = { foo: expect.any(String) }
        expect(generator()).toStrictEqual(expected)
      })
    })

    describe('MinProperties & MaxProperties', () => {
      const schema = {
        type: 'object',
        properties: {
          foo: {
            type: 'string'
          },
          bar: {
            type: 'string'
          },
          baz: {
            type: 'string'
          }
        },
        minProperties: 1,
        maxProperties: 2
      }

      const generator = createSchemaGenerator(schema)

      it('should return an object with 2 properties', () => {
        const expected = { foo: expect.any(String), bar: expect.any(String) }
        expect(generator()).toStrictEqual(expected)
      })
    })

    describe('WriteOnly', () => {
      const schema = {
        type: 'object',
        properties: {
          foo: {
            type: 'string'
          },
          bar: {
            type: 'string',
            writeOnly: true
          }
        }
      }

      const generator = createSchemaGenerator(schema)

      it('should return an object ignoring write only properties', () => {
        const expected = { foo: expect.any(String) }
        expect(generator()).toStrictEqual(expected)
      })
    })
  })

  describe('Array', () => {
    describe('Basic', () => {
      const schema = {
        type: 'array',
        items: {
          example: 1
        }
      }

      const generator = createSchemaGenerator(schema)

      it('should return an array of length 1', () => {
        const expected = [1]
        expect(generator()).toEqual(expected)
      })
    })

    describe('MinItems & MaxItems', () => {
      const schema = {
        type: 'array',
        items: {
          example: 1
        },
        minItems: 2,
        maxItems: 3
      }

      const generator = createSchemaGenerator(schema)

      it('should return an array of length 2', () => {
        const expected = [1, 1]
        expect(generator()).toEqual(expected)
      })
    })

    describe('AnyOf', () => {
      const schema = {
        type: 'array',
        items: {
          anyOf: [{
            example: 1
          }, {
            example: 2
          }]
        },
        minItems: 3,
        maxItems: 3
      }

      const generator = createSchemaGenerator(schema)

      it('should return an array of length 3', () => {
        const expected = [1, 2, 1]
        expect(generator()).toEqual(expected)
      })
    })
  })
})
