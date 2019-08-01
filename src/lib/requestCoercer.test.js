const createRequestCoercer = require('./requestCoercer')

describe('Empty', () => {
  const operation = {}

  const coercer = createRequestCoercer(operation)

  it('should return the original value when no coercion is needed', () => {
    const payload = { path: { param: 1 }, query: { param: 1 }, header: { 'x-foo-bar': 1 }, cookie: { name: 1 }, content: 'value', mediaType: 'application/json' }
    const expected = { path: { param: 1 }, query: { param: 1 }, header: { 'x-foo-bar': 1 }, cookie: { name: 1 }, content: 'value' }
    expect(coercer(payload)).toEqual(expected)
  })

  it('should return undefined when the value is missing', () => {
    expect(coercer()).toBeUndefined()
  })
})

describe('Parameters', () => {
  const operation = {
    parameters: [{
      name: 'param',
      in: 'query',
      schema: {
        type: 'integer'
      }
    }]
  }

  const coercer = createRequestCoercer(operation)

  it('should coerce parameters', () => {
    const payload = { query: { param: '1' }, mediaType: 'application/json' }
    const expected = { query: { param: 1 } }
    expect(coercer(payload)).toStrictEqual(expected)
  })
})

describe('RequestBody', () => {
  const operation = {
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'integer'
          }
        }
      }
    }
  }

  const coercer = createRequestCoercer(operation)

  it('should coerce both parameters and requestBody', () => {
    const payload = { content: '1', mediaType: 'application/json' }
    const expected = { content: 1 }
    expect(coercer(payload)).toStrictEqual(expected)
  })
})

describe('Parameters & requestBody', () => {
  const operation = {
    parameters: [{
      name: 'param',
      in: 'query',
      schema: {
        type: 'integer'
      }
    }],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'integer'
          }
        }
      }
    }
  }

  const coercer = createRequestCoercer(operation)

  it('should coerce both parameters and requestBody', () => {
    const payload = { query: { param: '1' }, content: '1', mediaType: 'application/json' }
    const expected = { query: { param: 1 }, content: 1 }
    expect(coercer(payload)).toStrictEqual(expected)
  })
})
