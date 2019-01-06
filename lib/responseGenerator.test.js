/* globals describe, it, expect */

const createResponseGenerator = require('./responseGenerator')

describe('Empty', () => {
  const operation = {}

  const generator = createResponseGenerator(operation)

  it('should return undefined', () => {
    expect(generator()).toBeUndefined()
  })
})

describe('Responses', () => {
  const operation = {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'boolean',
              example: true
            }
          }
        }
      }
    }
  }

  const generator = createResponseGenerator(operation)

  it('should return a valid generated response', () => {
    const payload = { mediaType: 'application/json', status: 200 }

    expect(generator(payload)).toStrictEqual({ content: true })
  })
})
