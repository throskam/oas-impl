import SchemaValidator from './schema'

describe('Type', () => {
  const schema = {
    type: 'integer'
  }

  const validator = new SchemaValidator(schema)

  it('should return no errors when the value is valid', () => {
    const payload = { value: 1 }
    expect(validator.validate(payload)).toMatchSnapshot()
  })

  it('should return a validation error when the value is invalid', () => {
    const payload = { value: 'string' }
    expect(validator.validate(payload)).toMatchSnapshot()
  })

  it('should return a validation error when the value is missing', () => {
    expect(validator.validate()).toMatchSnapshot()
  })
})

describe('Custom format', () => {
  const schema = {
    type: 'number',
    format: 'even'
  }

  const validator = new SchemaValidator(schema, {
    format: {
      even: {
        validator: {
          type: 'number',
          validate: val => {
            return val % 2 === 0
          }
        }
      }
    }
  })

  it('should return no errors when the value is even', () => {
    const payload = { value: 2 }
    expect(validator.validate(payload)).toMatchSnapshot()
  })

  it('should return a validation error when the value is odd', () => {
    const payload = { value: 1 }
    expect(validator.validate(payload)).toMatchSnapshot()
  })

  it('should return a validation error when the value is missing', () => {
    expect(validator.validate()).toMatchSnapshot()
  })
})
