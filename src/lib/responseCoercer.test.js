import ResponseCoercer from './responseCoercer'

describe('Empty', () => {
  const operation = {}

  const coercer = new ResponseCoercer(operation)

  it('should return the original value when no coercion is needed', () => {
    const payload = { header: { 'x-custom-header': 1 }, content: 'value' }
    const expected = { header: { 'x-custom-header': 1 }, content: 'value' }
    expect(coercer.coerce(payload)).toStrictEqual(expected)
  })

  it('should return undefined when the value is missing', () => {
    expect(coercer.coerce()).toBeUndefined()
  })
})

describe('Headers', () => {
  const operation = {
    responses: {
      200: {
        headers: {
          'x-foo-bar': {
            schema: {
              type: 'integer'
            }
          }
        }
      }
    }
  }

  const coercer = new ResponseCoercer(operation)

  it('should return the coerced value', () => {
    const payload = { header: { 'x-foo-bar': '1' }, mediaType: 'application/json', status: 200 }
    const expected = { header: { 'x-foo-bar': 1 } }
    expect(coercer.coerce(payload)).toStrictEqual(expected)
  })

  it('should return undefined when the value is missing', () => {
    expect(coercer.coerce()).toBeUndefined()
  })
})

describe('Content', () => {
  const operation = {
    responses: {
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
  }

  const coercer = new ResponseCoercer(operation)

  it('should return the coerced value', () => {
    const payload = { content: '1234', mediaType: 'application/json', status: 200 }
    const expected = { content: 1234 }
    expect(coercer.coerce(payload)).toStrictEqual(expected)
  })

  it('should return undefined when the value is missing', () => {
    expect(coercer.coerce()).toBeUndefined()
  })
})

describe('Headers & Content', () => {
  const operation = {
    responses: {
      200: {
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
    }
  }

  const coercer = new ResponseCoercer(operation)

  it('should return the coerced value', () => {
    const payload = { header: { 'x-foo-bar': '1' }, content: '1', mediaType: 'application/json', status: 200 }
    const expected = { header: { 'x-foo-bar': 1 }, content: 1 }
    expect(coercer.coerce(payload)).toStrictEqual(expected)
  })

  it('should return undefined when the value is missing', () => {
    expect(coercer.coerce()).toBeUndefined()
  })
})
