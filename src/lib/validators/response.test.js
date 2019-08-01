const createResponseValidator = require('./response')

describe('Empty', () => {
  const response = {}

  const validator = createResponseValidator(response)

  it('should return no errors', () => {
    expect(validator()).toMatchSnapshot()
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

  const validator = createResponseValidator(response)

  it('should return no errors when the headers and content are valid', () => {
    const payload = { header: { 'x-foo-bar': 1 }, content: 1, mediaType: 'application/json' }
    expect(validator(payload)).toMatchSnapshot()
  })

  it('should return validation errors when the headers and content are invalid', () => {
    const payload = { header: { 'x-foo-bar': 'string', content: true, mediaType: 'application/json' } }
    expect(validator(payload)).toMatchSnapshot()
  })
})
