import createHeadersValidator from './headers'

describe('Empty', () => {
  const headers = {
    'x-foo-bar': {
      required: true
    }
  }

  const validator = createHeadersValidator(headers)

  it('should return a required error', () => {
    expect(validator()).toMatchSnapshot()
  })
})

describe('Insensitive', () => {
  const headers = {
    'X-FoO-bAR': {
      required: true
    }
  }

  const validator = createHeadersValidator(headers)

  it('should return no errors when the header case match', () => {
    const payload = { header: { 'X-FoO-bAR': 1 } }
    expect(validator(payload)).toMatchSnapshot()
  })

  it('should return no errors when the header case missmatch', () => {
    const payload = { header: { 'x-fOO-Bar': 1 } }
    expect(validator(payload)).toMatchSnapshot()
  })
})
