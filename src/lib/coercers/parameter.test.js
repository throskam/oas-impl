import ParameterCoercer from './parameter'

describe('Empty', () => {
  const parameter = {}

  const coercer = new ParameterCoercer(parameter)

  it('should return the original value when no coercion is needed', () => {
    const payload = { value: 'value' }
    const expected = 'value'
    expect(coercer.coerce(payload)).toEqual(expected)
  })

  it('should return undefined when the value is missing', () => {
    expect(coercer.coerce()).toBeUndefined()
  })
})

describe('Schema', () => {
  const parameter = {
    schema: {
      type: 'integer'
    }
  }

  const coercer = new ParameterCoercer(parameter)

  it('should return the coerced value', () => {
    const payload = { value: '1' }
    const expected = 1
    expect(coercer.coerce(payload)).toEqual(expected)
  })

  it('should return undefined when the value is missing', () => {
    expect(coercer.coerce()).toBeUndefined()
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

  const coercer = new ParameterCoercer(parameter)

  it('should return the application/json default', () => {
    const payload = { value: '1', mediaType: 'application/json' }
    const expected = 1
    expect(coercer.coerce(payload)).toEqual(expected)
  })

  it('should return undefined when the value is missing', () => {
    expect(coercer.coerce()).toBeUndefined()
  })
})

describe('Style', () => {
  const parameter = {
    in: 'path',
    schema: {
      type: 'array',
      items: {
        type: 'integer'
      }
    },
    style: 'simple'
  }

  const coercer = new ParameterCoercer(parameter)

  it('should return the parsed and coerced value', () => {
    const payload = { value: '1,2,3' }
    const expected = [1, 2, 3]
    expect(coercer.coerce(payload)).toStrictEqual(expected)
  })
})
