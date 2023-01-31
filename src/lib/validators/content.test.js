import ContentValidator from './content'

describe('Empty media type', () => {
  const content = {
    'application/json': {}
  }

  const validator = new ContentValidator(content)

  it('should return no errors', () => {
    const payload = { value: 1, mediaType: 'application/json' }
    expect(validator.validate(payload)).toMatchSnapshot()
  })
})

describe('Media type', () => {
  const content = {
    'application/json': {
      schema: {
        type: 'integer'
      }
    }
  }

  const validator = new ContentValidator(content)

  it('should return no errors when the the value and media type are valid', () => {
    const payload = { value: 1, mediaType: 'application/json' }
    expect(validator.validate(payload)).toMatchSnapshot()
  })

  it('should return a validation error when the value is invalid', () => {
    const payload = { value: 'string', mediaType: 'application/json' }
    expect(validator.validate(payload)).toMatchSnapshot()
  })

  it('should return an unknown media type error when the media type is undefined', () => {
    expect(validator.validate()).toMatchSnapshot()
  })

  it('should return an unsupported media type error when the media type is not supported', () => {
    const payload = { value: 1, mediaType: 'foo/bar' }
    expect(validator.validate(payload)).toMatchSnapshot()
  })
})
