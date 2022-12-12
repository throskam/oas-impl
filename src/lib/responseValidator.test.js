import createResponseValidator from './responseValidator'

describe('Empty', () => {
  const operation = {}

  const validator = createResponseValidator(operation)

  it('should return no errors', () => {
    expect(validator().length).toEqual(0)
  })
})

describe('Responses', () => {
  const operation = {
    responses: {
      default: {
        headers: {
          'x-foo-bar': {
            required: true
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
    }
  }

  const validator = createResponseValidator(operation)

  it('should return two validation errors', () => {
    const payload = { header: {}, content: 'string', mediaType: 'application/json' }
    expect(validator(payload).length).toEqual(2)
  })

  it('should return no errors', () => {
    const payload = { header: { 'x-foo-bar': 1 }, content: 1, mediaType: 'application/json' }
    expect(validator(payload).length).toEqual(0)
  })
})
