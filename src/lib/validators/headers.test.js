import HeadersValidator from './headers'

describe('Empty', () => {
  const headers = {
    'x-foo-bar': {
      required: true
    }
  }

  const validator = new HeadersValidator(headers)

  it('should return a required error', () => {
    expect(validator.validate()).toMatchSnapshot()
  })
})

describe('Insensitive', () => {
  const headers = {
    'X-FoO-bAR': {
      required: true
    }
  }

  const validator = new HeadersValidator(headers)

  it('should return no errors when the header case match', () => {
    const payload = { header: { 'X-FoO-bAR': 1 } }
    expect(validator.validate(payload)).toMatchSnapshot()
  })

  it('should return no errors when the header case missmatch', () => {
    const payload = { header: { 'x-fOO-Bar': 1 } }
    expect(validator.validate(payload)).toMatchSnapshot()
  })
})
