import RequestBodyValidator from './requestBody'

describe('Empty content', () => {
  const requestBody = {
    required: true
  }

  const validator = new RequestBodyValidator(requestBody)

  it('should no rerros', () => {
    const payload = { value: 1, mediaType: 'application/json' }
    expect(validator.validate(payload)).toMatchSnapshot()
  })
})

describe('Required', () => {
  const requestBody = {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'integer'
        }
      }
    }
  }

  const validator = new RequestBodyValidator(requestBody)

  it('should return no errors when the value is defined', () => {
    const payload = { value: 1, mediaType: 'application/json' }
    expect(validator.validate(payload)).toMatchSnapshot()
  })

  it('should return a required error when the value is missing', () => {
    expect(validator.validate()).toMatchSnapshot()
  })
})

describe('Optional', () => {
  const requestBody = {
    content: {
      'application/json': {
        schema: {
          type: 'integer'
        }
      }
    }
  }

  const validator = new RequestBodyValidator(requestBody)

  it('should return no errors when the value is defined', () => {
    const payload = { value: 1, mediaType: 'application/json' }
    expect(validator.validate(payload)).toMatchSnapshot()
  })

  it('should return no errors when the value is missing', () => {
    expect(validator.validate()).toMatchSnapshot()
  })
})

describe('Content', () => {
  const requestBody = {
    content: {
      'application/json': {
        schema: {
          type: 'integer'
        }
      }
    }
  }

  const validator = new RequestBodyValidator(requestBody)

  it('should return a validation error when the value is invalid', () => {
    const payload = { value: 'string', mediaType: 'application/json' }
    expect(validator.validate(payload)).toMatchSnapshot()
  })
})
