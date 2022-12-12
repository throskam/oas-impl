import createContentCoercer from './content'

describe('Empty', () => {
  const content = {}

  const coercer = createContentCoercer(content)

  it('should return the original value when no coercion is needed', () => {
    const payload = { value: 'value' }
    const expected = 'value'
    expect(coercer(payload)).toEqual(expected)
  })

  it('should return undefined when the value is missing', () => {
    expect(coercer()).toBeUndefined()
  })
})

describe('Media type', () => {
  const content = {
    'application/json': {
      schema: {
        type: 'integer'
      }
    }
  }

  const coercer = createContentCoercer(content)

  it('should return the coerced value', () => {
    const payload = { value: '1', mediaType: 'application/json' }
    const expected = 1
    expect(coercer(payload)).toEqual(expected)
  })

  it('should return undefined when the value is missing', () => {
    expect(coercer()).toBeUndefined()
  })
})
