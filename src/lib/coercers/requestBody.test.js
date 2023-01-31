import RequestBodyCoercer from './requestBody'

describe('Empty', () => {
  const requestBody = {}

  const coercer = new RequestBodyCoercer(requestBody)

  it('should return the original value when no content is defined', () => {
    const payload = { content: 1 }
    const expected = 1
    expect(coercer.coerce(payload)).toEqual(expected)
  })

  it('should return undefined when the value is missing', () => {
    expect(coercer.coerce()).toBeUndefined()
  })
})

describe('Content', () => {
  const requestBody = {
    content: {
      'application/json': {
        schema: {
          type: 'integer'
        }
      }
    }
  }

  const coercer = new RequestBodyCoercer(requestBody)

  it('should return the coerced value', () => {
    const payload = { content: '1', mediaType: 'application/json' }
    const expected = 1
    expect(coercer.coerce(payload)).toEqual(expected)
  })

  it('should return undefined when the value is missing', () => {
    expect(coercer.coerce()).toBeUndefined()
  })
})
