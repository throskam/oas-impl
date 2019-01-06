/* globals describe, it, expect */

const createResponsesCoercer = require('./responses')

describe('Empty', () => {
  const response = {}

  const coercer = createResponsesCoercer(response)

  it('should return the original value when no coercion is needed', () => {
    const payload = { header: { 'x-foo-bar': 1 }, content: 'value' }
    const expected = { header: { 'x-foo-bar': 1 }, content: 'value' }
    expect(coercer(payload)).toStrictEqual(expected)
  })

  it('should return undefined when the value is missing', () => {
    expect(coercer()).toBeUndefined()
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

  const coercer = createResponsesCoercer(responses)

  it('should return the coerced value', () => {
    const payload = { content: '1', mediaType: 'application/json', status: 200 }
    const expected = { content: 1 }
    expect(coercer(payload)).toStrictEqual(expected)
  })

  it('should return undefined when the value is missing', () => {
    expect(coercer()).toBeUndefined()
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

  const coercer = createResponsesCoercer(responses)

  it('should return the coerced value', () => {
    const payload = { content: '1', mediaType: 'application/json', status: 200 }
    const expected = { content: 1 }
    expect(coercer(payload)).toStrictEqual(expected)
  })

  it('should return undefined when the value is missing', () => {
    expect(coercer()).toBeUndefined()
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

  const coercer = createResponsesCoercer(responses)

  it('should return the coerced value', () => {
    const payload = { content: '1', mediaType: 'application/json', status: 200 }
    const expected = { content: 1 }
    expect(coercer(payload)).toStrictEqual(expected)
  })

  it('should return undefined when the value is missing', () => {
    expect(coercer()).toBeUndefined()
  })
})
