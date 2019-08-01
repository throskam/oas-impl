const createParameterCoercer = require('./parameter')

describe('Empty', () => {
  const parameter = {}

  const coercer = createParameterCoercer(parameter)

  it('should return the original value when no coercion is needed', () => {
    const payload = { value: 'value' }
    const expected = 'value'
    expect(coercer(payload)).toEqual(expected)
  })

  it('should return undefined when the value is missing', () => {
    expect(coercer()).toBeUndefined()
  })
})

describe('Schema', () => {
  const parameter = {
    schema: {
      type: 'integer'
    }
  }

  const coercer = createParameterCoercer(parameter)

  it('should return the coerced value', () => {
    const payload = { value: '1' }
    const expected = 1
    expect(coercer(payload)).toEqual(expected)
  })

  it('should return undefined if the value is missing', () => {
    expect(coercer()).toBeUndefined()
  })
})

describe('Content', () => {
  const parameter = {
    content: {
      'application/json': {
        schema: {
          type: 'integer'
        }
      }
    }
  }

  const coercer = createParameterCoercer(parameter)

  it('should return the application/json default ', () => {
    const payload = { value: '1', mediaType: 'application/json' }
    const expected = 1
    expect(coercer(payload)).toEqual(expected)
  })

  it('should return undefined if the value is missing', () => {
    expect(coercer()).toBeUndefined()
  })
})
