import ResponseValidator from './responseValidator'

describe('Empty', () => {
  const operation = {}

  const validator = new ResponseValidator(operation)

  it('should return no errors', () => {
    expect(validator.validate().length).toEqual(0)
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

  const validator = new ResponseValidator(operation)

  it('should return two validation errors', () => {
    const payload = { header: {}, content: 'string', mediaType: 'application/json' }
    expect(validator.validate(payload).length).toEqual(2)
  })

  it('should return no errors', () => {
    const payload = { header: { 'x-foo-bar': 1 }, content: 1, mediaType: 'application/json' }
    expect(validator.validate(payload).length).toEqual(0)
  })
})
