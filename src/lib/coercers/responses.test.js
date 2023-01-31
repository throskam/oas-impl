import ResponsesCoercer from './responses'

describe('Empty', () => {
  const response = {}

  const coercer = new ResponsesCoercer(response)

  it('should return the original value when no coercion is needed', () => {
    const payload = { header: { 'x-foo-bar': 1 }, content: 'value' }
    const expected = { header: { 'x-foo-bar': 1 }, content: 'value' }
    expect(coercer.coerce(payload)).toStrictEqual(expected)
  })

  it('should return undefined when the value is missing', () => {
    expect(coercer.coerce()).toBeUndefined()
  })
})

describe('Exact', () => {
  const responses = {
    200: {
      content: {
        'application/json': {
          schema: {
            type: 'integer'
          }
        }
      }
    }
  }

  const coercer = new ResponsesCoercer(responses)

  it('should return the coerced value', () => {
    const payload = { content: '1', mediaType: 'application/json', status: 200 }
    const expected = { content: 1 }
    expect(coercer.coerce(payload)).toStrictEqual(expected)
  })

  it('should return undefined when the value is missing', () => {
    expect(coercer.coerce()).toBeUndefined()
  })
})

describe('Default', () => {
  const responses = {
    default: {
      content: {
        'application/json': {
          schema: {
            type: 'integer'
          }
        }
      }
    }
  }

  const coercer = new ResponsesCoercer(responses)

  it('should return the coerced value', () => {
    const payload = { content: '1', mediaType: 'application/json', status: 200 }
    const expected = { content: 1 }
    expect(coercer.coerce(payload)).toStrictEqual(expected)
  })

  it('should return undefined when the value is missing', () => {
    expect(coercer.coerce()).toBeUndefined()
  })
})

describe('Wildcard', () => {
  const responses = {
    '2XX': {
      content: {
        'application/json': {
          schema: {
            type: 'integer'
          }
        }
      }
    }
  }

  const coercer = new ResponsesCoercer(responses)

  it('should return the coerced value', () => {
    const payload = { content: '1', mediaType: 'application/json', status: 200 }
    const expected = { content: 1 }
    expect(coercer.coerce(payload)).toStrictEqual(expected)
  })

  it('should return undefined when the value is missing', () => {
    expect(coercer.coerce()).toBeUndefined()
  })
})
