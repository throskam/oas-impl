const createResponseGenerator = require('./response')

describe('Empty', () => {
  const response = {}

  const generator = createResponseGenerator(response)

  it('should return undefined when no content is defined', () => {
    expect(generator()).toBeUndefined()
  })
})

describe('Headers', () => {
  const response = {
    headers: {
      'x-foo-bar': {
        schema: {
          type: 'integer',
          example: 1234
        }
      }
    }
  }

  const generator = createResponseGenerator(response)

  it('should return a header generated', () => {
    const expected = { header: { 'x-foo-bar': 1234 } }
    expect(generator()).toEqual(expected)
  })
})

describe('Content', () => {
  const response = {
    content: {
      'application/json': {
        schema: {
          type: 'integer',
          example: 1234
        }
      }
    }
  }

  const generator = createResponseGenerator(response)

  it('should return a content generated', () => {
    const payload = { mediaType: 'application/json' }
    const expected = { content: 1234 }
    expect(generator(payload)).toEqual(expected)
  })
})

describe('Headers & Content', () => {
  const response = {
    headers: {
      'x-foo-bar': {
        schema: {
          type: 'integer',
          example: 1234
        }
      }
    },
    content: {
      'application/json': {
        schema: {
          type: 'integer',
          example: 1234
        }
      }
    }
  }

  const generator = createResponseGenerator(response)

  it('should return a header generated', () => {
    const payload = { mediaType: 'application/json' }
    const expected = { header: { 'x-foo-bar': 1234 }, content: 1234 }
    expect(generator(payload)).toEqual(expected)
  })
})
