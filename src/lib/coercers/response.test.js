import ResponseCoercer from './response'

describe('Empty', () => {
  const response = {}

  const coercer = new ResponseCoercer(response)

  it('should return the original value when no coercion is needed', () => {
    const payload = { content: 'value' }
    const expected = { content: 'value' }
    expect(coercer.coerce(payload)).toStrictEqual(expected)
  })

  it('should return undefined when the value is missing', () => {
    expect(coercer.coerce()).toBeUndefined()
  })
})

describe('Headers', () => {
  const response = {
    headers: {
      'x-foo-bar': {
        schema: {
          type: 'integer'
        }
      }
    }
  }

  const coercer = new ResponseCoercer(response)

  it('should return the coerced value', () => {
    const payload = { header: { 'x-foo-bar': '1' }, mediaType: 'application/json' }
    const expected = { header: { 'x-foo-bar': 1 } }
    expect(coercer.coerce(payload)).toStrictEqual(expected)
  })

  it('should return undefined when the value is missing', () => {
    expect(coercer.coerce()).toBeUndefined()
  })
})

describe('Content', () => {
  const response = {
    content: {
      'application/json': {
        schema: {
          type: 'integer'
        }
      }
    }
  }

  const coercer = new ResponseCoercer(response)

  it('should return the coerced value', () => {
    const payload = { content: '1234', mediaType: 'application/json' }
    const expected = { content: 1234 }
    expect(coercer.coerce(payload)).toStrictEqual(expected)
  })

  it('should return undefined when the value is missing', () => {
    expect(coercer.coerce()).toBeUndefined()
  })
})

describe('Headers & Content', () => {
  const response = {
    headers: {
      'x-foo-bar': {
        schema: {
          type: 'integer'
        }
      }
    },
    content: {
      'application/json': {
        schema: {
          type: 'integer'
        }
      }
    }
  }

  const coercer = new ResponseCoercer(response)

  it('should return the coerced value', () => {
    const payload = { header: { 'x-foo-bar': '1' }, content: '1', mediaType: 'application/json' }
    const expected = { header: { 'x-foo-bar': 1 }, content: 1 }
    expect(coercer.coerce(payload)).toStrictEqual(expected)
  })

  it('should return undefined when the value is missing', () => {
    expect(coercer.coerce()).toBeUndefined()
  })
})
