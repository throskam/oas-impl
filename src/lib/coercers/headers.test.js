import HeadersCoercer from './headers'

describe('Empty', () => {
  const headers = {}

  const coercer = new HeadersCoercer(headers)

  it('should return the original value when no coercion is needed', () => {
    const payload = { header: { 'x-custom-header': 0 } }
    const expected = { 'x-custom-header': 0 }
    expect(coercer.coerce(payload)).toStrictEqual(expected)
  })

  it('should return undefined when the value is missing', () => {
    expect(coercer.coerce()).toBeUndefined()
  })
})

describe('Insensitive', () => {
  const headers = {
    'X-FoO-bAR': {
      schema: {
        type: 'integer'
      }
    }
  }

  const coercer = new HeadersCoercer(headers)

  it('should return the coerced value when the case match', () => {
    const payload = { header: { 'X-FoO-bAR': 1 } }
    const expected = { 'X-FoO-bAR': 1 }
    expect(coercer.coerce(payload)).toStrictEqual(expected)
  })

  it('should return the coerced value when the case missmatch', () => {
    const payload = { header: { 'x-fOO-Bar': 1 } }
    const expected = { 'X-FoO-bAR': 1 }
    expect(coercer.coerce(payload)).toStrictEqual(expected)
  })
})

describe('Header', () => {
  const headers = {
    'x-foo-bar': {
      schema: {
        type: 'integer'
      }
    }
  }

  const coercer = new HeadersCoercer(headers)

  it('should return the coerced value', () => {
    const payload = { header: { 'x-foo-bar': '1' } }
    const expected = { 'x-foo-bar': 1 }
    expect(coercer.coerce(payload)).toStrictEqual(expected)
  })

  it('should return additional value with the coerced value', () => {
    const payload = { header: { 'x-custom-header': 1, 'x-foo-bar': '1' } }
    const expected = { 'x-custom-header': 1, 'x-foo-bar': 1 }
    expect(coercer.coerce(payload)).toStrictEqual(expected)
  })

  it('should return undefined when the value is missing', () => {
    expect(coercer.coerce()).toBeUndefined()
  })
})
