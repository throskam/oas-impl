import ParameterGenerator from './parameter'

describe('Empty', () => {
  const parameter = {}

  const generator = new ParameterGenerator(parameter)

  it('should return undefined when no schema or content is defined', () => {
    expect(generator.generate()).toBeUndefined()
  })
})

describe('Schema', () => {
  const parameter = {
    name: 'param',
    schema: {
      type: 'integer',
      example: 1234
    }
  }

  const generator = new ParameterGenerator(parameter)

  it('should return the example', () => {
    const expected = 1234
    expect(generator.generate()).toEqual(expected)
  })
})

describe('Content', () => {
  const parameter = {
    name: 'param',
    content: {
      'application/json': {
        schema: {
          type: 'integer',
          example: 1234
        }
      }
    }
  }

  const generator = new ParameterGenerator(parameter)

  it('should return the application/json example', () => {
    const expected = 1234
    expect(generator.generate()).toEqual(expected)
  })
})
