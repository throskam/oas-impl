import createResponsesValidator from './responses'

describe('Empty', () => {
  const response = {}

  const validator = createResponsesValidator(response)

  it('should return no errors', () => {
    expect(validator()).toMatchSnapshot()
  })
})

describe('Exact', () => {
  const responses = {
    200: {
      content: {
        'application/json': {
          schema: {
            type: 'integer'
          }
        }
      }
    }
  }

  const validator = createResponsesValidator(responses)

  it('should return no errors when the value is valid', () => {
    const payload = { content: 1, mediaType: 'application/json', status: 200 }
    expect(validator(payload)).toMatchSnapshot()
  })

  it('should return a validation error when the value is invalid', () => {
    const payload = { content: 'string', mediaType: 'application/json', status: 200 }
    expect(validator(payload)).toMatchSnapshot()
  })
})

describe('Default', () => {
  const responses = {
    default: {
      content: {
        'application/json': {
          schema: {
            type: 'integer'
          }
        }
      }
    }
  }

  const validator = createResponsesValidator(responses)

  it('should return no errors when the value is valid', () => {
    const payload = { content: 1, mediaType: 'application/json', status: 200 }
    expect(validator(payload)).toMatchSnapshot()
  })

  it('should return a validation error when the value is invalid', () => {
    const payload = { content: 'string', mediaType: 'application/json', status: 200 }
    expect(validator(payload)).toMatchSnapshot()
  })
})

describe('Wildcard', () => {
  const responses = {
    '2XX': {
      content: {
        'application/json': {
          schema: {
            type: 'integer'
          }
        }
      }
    }
  }

  const validator = createResponsesValidator(responses)

  it('should return no errors when the value is defined', () => {
    const payload = { content: 1, mediaType: 'application/json', status: 200 }
    expect(validator(payload)).toMatchSnapshot()
  })

  it('should return a validation error when the value is valid', () => {
    const payload = { content: 'string', mediaType: 'application/json', status: 200 }
    expect(validator(payload)).toMatchSnapshot()
  })
})
