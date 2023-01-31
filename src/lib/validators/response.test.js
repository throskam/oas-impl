import ResponseValidator from './response'

describe('Empty', () => {
  const response = {}

  const validator = new ResponseValidator(response)

  it('should return no errors', () => {
    expect(validator.validate()).toMatchSnapshot()
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

  const validator = new ResponseValidator(response)

  it('should return no errors when the headers and content are valid', () => {
    const payload = { header: { 'x-foo-bar': 1 }, content: 1, mediaType: 'application/json' }
    expect(validator.validate(payload)).toMatchSnapshot()
  })

  it('should return validation errors when the headers and content are invalid', () => {
    const payload = { header: { 'x-foo-bar': 'string', content: true, mediaType: 'application/json' } }
    expect(validator.validate(payload)).toMatchSnapshot()
  })
})
