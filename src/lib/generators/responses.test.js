const createResponsesGenerator = require('./responses')

describe('Empty', () => {
  const responses = {}

  const generator = createResponsesGenerator(responses)

  it('should return undefined when no responses are defined', () => {
    expect(generator()).toBeUndefined()
  })
})

describe('Exact', () => {
  const responses = {
    200: {
      content: {
        'application/json': {
          schema: {
            type: 'integer',
            example: 1234
          }
        }
      }
    }
  }

  const generator = createResponsesGenerator(responses)

  it('should return the 200 status example when the status is 200', () => {
    const payload = { mediaType: 'application/json', status: 200 }
    const expected = { content: 1234 }
    expect(generator(payload)).toStrictEqual(expected)
  })

  it('should return undefined when the status does not match and there is no default', () => {
    const payload = { mediaType: 'application/json', status: 201 }
    expect(generator(payload)).toBeUndefined()
  })
})

describe('Default', () => {
  const responses = {
    default: {
      content: {
        'application/json': {
          schema: {
            type: 'integer',
            example: 1234
          }
        }
      }
    }
  }

  const generator = createResponsesGenerator(responses)

  it('should return the default status example when the status is missing', () => {
    const payload = { mediaType: 'application/json', status: 200 }
    const expected = { content: 1234 }
    expect(generator(payload)).toEqual(expected)
  })

  it('should return the default status example when the status is undefined', () => {
    const payload = { mediaType: 'application/json' }
    const expected = { content: 1234 }
    expect(generator(payload)).toStrictEqual(expected)
  })
})

describe('Wildcard', () => {
  const responses = {
    '2XX': {
      content: {
        'application/json': {
          schema: {
            type: 'integer',
            example: 1234
          }
        }
      }
    }
  }

  const generator = createResponsesGenerator(responses)

  it('should return the 2XX example when the status match the pattern', () => {
    const payload = { mediaType: 'application/json', status: 210 }
    const expected = { content: 1234 }
    expect(generator(payload)).toEqual(expected)
  })

  it('should return undefined when the status does not match and there is no default', () => {
    const payload = { mediaType: 'application/json', status: 300 }
    expect(generator(payload)).toBeUndefined()
  })
})
