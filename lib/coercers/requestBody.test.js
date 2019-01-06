/* globals describe, it, expect */

const createRequestBodyCoercer = require('./requestBody')

describe('Empty', () => {
  const requestBody = {}

  const coercer = createRequestBodyCoercer(requestBody)

  it('should return the original value when no content is defined', () => {
    const payload = { content: 1 }
    const expected = 1
    expect(coercer(payload)).toEqual(expected)
  })

  it('should return undefined when the value is missing', () => {
    expect(coercer()).toBeUndefined()
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

  const coercer = createRequestBodyCoercer(requestBody)

  it('should return the coerced value', () => {
    const payload = { content: '1', mediaType: 'application/json' }
    const expected = 1
    expect(coercer(payload)).toEqual(expected)
  })

  it('should return undefined if the value is missing', () => {
    expect(coercer()).toBeUndefined()
  })
})
