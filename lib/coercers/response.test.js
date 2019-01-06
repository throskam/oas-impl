/* globals describe, it, expect */

const createResponseCoercer = require('./response')

describe('Empty', () => {
  const response = {}

  const coercer = createResponseCoercer(response)

  it('should return the original value when no coercion is needed', () => {
    const payload = { content: 'value' }
    const expected = { content: 'value' }
    expect(coercer(payload)).toStrictEqual(expected)
  })

  it('should return undefined when the value is missing', () => {
    expect(coercer()).toBeUndefined()
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

  const coercer = createResponseCoercer(response)

  it('should return the coerced value', () => {
    const payload = { header: { 'x-foo-bar': '1' }, mediaType: 'application/json' }
    const expected = { header: { 'x-foo-bar': 1 } }
    expect(coercer(payload)).toStrictEqual(expected)
  })

  it('should return undefined when the value is missing', () => {
    expect(coercer()).toBeUndefined()
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

  const coercer = createResponseCoercer(response)

  it('should return the coerced value', () => {
    const payload = { content: '1234', mediaType: 'application/json' }
    const expected = { content: 1234 }
    expect(coercer(payload)).toStrictEqual(expected)
  })

  it('should return undefined when the value is missing', () => {
    expect(coercer()).toBeUndefined()
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

  const coercer = createResponseCoercer(response)

  it('should return the coerced value', () => {
    const payload = { header: { 'x-foo-bar': '1' }, content: '1', mediaType: 'application/json' }
    const expected = { header: { 'x-foo-bar': 1 }, content: 1 }
    expect(coercer(payload)).toStrictEqual(expected)
  })

  it('should return undefined when the value is missing', () => {
    expect(coercer()).toBeUndefined()
  })
})
