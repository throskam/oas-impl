import ParametersCoercer from './parameters'

describe('Empty', () => {
  const parameters = []

  const coercer = new ParametersCoercer(parameters)

  it('should return the original value when no coercion is needed', () => {
    const payload = { path: { param: 0 } }
    const expected = { path: { param: 0 } }
    expect(coercer.coerce(payload)).toStrictEqual(expected)
  })

  it('should return undefined when the value is missing', () => {
    expect(coercer.coerce()).toBeUndefined()
  })
})

describe('Path', () => {
  const parameters = [{
    name: 'param',
    in: 'path',
    schema: {
      type: 'integer'
    }
  }]

  const coercer = new ParametersCoercer(parameters)

  it('should return the coerced value', () => {
    const payload = { path: { param: '0' } }
    const expected = { path: { param: 0 } }
    expect(coercer.coerce(payload)).toStrictEqual(expected)
  })

  it('should return undefined when the value is missing', () => {
    expect(coercer.coerce()).toBeUndefined()
  })
})

describe('Query', () => {
  const parameters = [{
    name: 'param',
    in: 'query',
    schema: {
      type: 'integer'
    }
  }]

  const coercer = new ParametersCoercer(parameters)

  it('should return the coerced value', () => {
    const payload = { query: { param: '0' } }
    const expected = { query: { param: 0 } }
    expect(coercer.coerce(payload)).toStrictEqual(expected)
  })

  it('should return undefined when the value is missing', () => {
    expect(coercer.coerce()).toBeUndefined()
  })
})

describe('Header', () => {
  const parameters = [{
    name: 'x-foo-bar',
    in: 'header',
    schema: {
      type: 'integer'
    }
  }]

  const coercer = new ParametersCoercer(parameters)

  it('should return the coerced value', () => {
    const payload = { header: { 'x-foo-bar': '1' } }
    const expected = { header: { 'x-foo-bar': 1 } }
    expect(coercer.coerce(payload)).toStrictEqual(expected)
  })

  it('should return header with lower case', () => {
    const payload = { header: { 'X-Foo-bAR': 1 } }
    const expected = { header: { 'x-foo-bar': 1 } }
    expect(coercer.coerce(payload)).toStrictEqual(expected)
  })

  it('should return undefined when the value is missing', () => {
    expect(coercer.coerce()).toBeUndefined()
  })
})

describe('Cookie', () => {
  const parameters = [{
    name: 'name',
    in: 'cookie',
    schema: {
      type: 'integer'
    }
  }]

  const coercer = new ParametersCoercer(parameters)

  it('should return the coerced value', () => {
    const payload = { cookie: { name: '1' } }
    const expected = { cookie: { name: 1 } }
    expect(coercer.coerce(payload)).toStrictEqual(expected)
  })

  it('should return undefined when the value is missing', () => {
    expect(coercer.coerce()).toBeUndefined()
  })
})

describe('Additional parameters', () => {
  const parameters = [{
    name: 'param',
    in: 'path',
    schema: {
      type: 'integer'
    }
  }]

  const coercer = new ParametersCoercer(parameters)

  it('should keep additional parameters with coerced value', () => {
    const payload = { path: { param: '1' }, query: { param: 1 } }
    const expected = { path: { param: 1 }, query: { param: 1 } }
    expect(coercer.coerce(payload)).toStrictEqual(expected)
  })
})
