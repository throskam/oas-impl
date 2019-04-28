/* globals describe, it, expect */

const createHeadersGenerator = require('./headers')

describe('Empty', () => {
  const headers = {}

  const generator = createHeadersGenerator(headers)

  it('should return undefined when no generation is available', () => {
    expect(generator()).toBeUndefined()
  })
})

describe('Insensitive', () => {
  const headers = {
    'X-FoO-bAR': {
      schema: {
        type: 'integer',
        example: 1234
      }
    }
  }

  const generator = createHeadersGenerator(headers)

  it('should return a lower case header', () => {
    const expected = { 'X-FoO-bAR': 1234 }
    expect(generator()).toStrictEqual(expected)
  })
})

describe('Header', () => {
  const headers = {
    'x-foo-bar': {
      schema: {
        type: 'integer',
        example: 1234
      }
    }
  }

  const generator = createHeadersGenerator(headers)

  it('should return the example', () => {
    const expected = { 'x-foo-bar': 1234 }
    expect(generator()).toStrictEqual(expected)
  })
})
