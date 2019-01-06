/* globals describe, it, expect */

const createSchemaValidator = require('./schema')

describe('Type', () => {
  const schema = {
    type: 'integer'
  }

  const validator = createSchemaValidator(schema)

  it('should return no errors when the value is valid', () => {
    const payload = { value: 1 }
    expect(validator(payload)).toMatchSnapshot()
  })

  it('should return validation error when the value is invalid', () => {
    const payload = { value: 'string' }
    expect(validator(payload)).toMatchSnapshot()
  })

  it('should return validation error when the value is missing', () => {
    expect(validator()).toMatchSnapshot()
  })
})
