import RequestValidator from './requestValidator'

describe('Empty', () => {
  const operation = {}

  const validator = new RequestValidator(operation)

  it('should return no errors', () => {
    expect(validator.validate().length).toEqual(0)
  })
})

describe('Parameters & requestBody', () => {
  const operation = {
    parameters: [{
      name: 'param',
      in: 'path',
      required: true
    }],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'integer'
          }
        }
      }
    }
  }

  const validator = new RequestValidator(operation)

  it('should return two validation errors', () => {
    const payload = { path: { param: null }, content: 'string', mediaType: 'application/json' }
    expect(validator.validate(payload).length).toEqual(2)
  })

  it('should return no errors', () => {
    const payload = { path: { param: 1 }, content: 1, mediaType: 'application/json' }
    expect(validator.validate(payload).length).toEqual(0)
  })
})
