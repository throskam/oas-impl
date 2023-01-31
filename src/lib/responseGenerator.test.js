import ResponseGenerator from './responseGenerator'

describe('Empty', () => {
  const operation = {}

  const generator = new ResponseGenerator(operation)

  it('should return undefined', () => {
    expect(generator.generate()).toBeUndefined()
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

  const generator = new ResponseGenerator(operation)

  it('should return a valid generated response', () => {
    const payload = { mediaType: 'application/json', status: 200 }

    expect(generator.generate(payload)).toStrictEqual({ content: true })
  })
})
