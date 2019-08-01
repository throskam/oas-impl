const parameterValidator = require('./parameter')

describe('Required', () => {
  const parameter = {
    name: 'param',
    required: true
  }

  const validator = parameterValidator(parameter)

  it('should return no errors when the value is defined', () => {
    const payload = { value: 1 }
    expect(validator(payload)).toMatchSnapshot()
  })

  it('should return a required error when the value is missing', () => {
    expect(validator()).toMatchSnapshot()
  })
})

describe('Optional', () => {
  const parameter = {}
  const validator = parameterValidator(parameter)

  it('should return no errors when the value is defined', () => {
    const payload = { value: 1 }
    expect(validator(payload)).toMatchSnapshot()
  })

  it('should return no errors when the value is missing', () => {
    expect(validator()).toMatchSnapshot()
  })
})

describe('Schema', () => {
  const parameter = {
    name: 'param',
    required: true,
    schema: {
      type: 'integer'
    }
  }

  const validator = parameterValidator(parameter)

  it('should return no errors when the value is valid', () => {
    const payload = { value: 1 }
    expect(validator(payload)).toMatchSnapshot()
  })

  it('should return a validation error when the value is invalid', () => {
    const payload = { value: 'string' }
    expect(validator(payload)).toMatchSnapshot()
  })

  it('should return a validation error when the value is null', () => {
    const payload = { value: null }
    expect(validator(payload)).toMatchSnapshot()
  })
})

describe('Content', () => {
  const parameter = {
    name: 'param',
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'integer'
        }
      }
    }
  }

  const validator = parameterValidator(parameter)

  it('should return no errors when the value is valid', () => {
    const payload = { value: 1 }
    expect(validator(payload)).toMatchSnapshot()
  })

  it('should return a validation error when the value is invalid', () => {
    const payload = { value: 'string' }
    expect(validator(payload)).toMatchSnapshot()
  })
})

describe('Deprecated', () => {
  const parameter = {
    name: 'param',
    deprecated: true,
    allowEmptyValue: true,
    schema: {
      type: 'integer'
    }
  }

  const validator = parameterValidator(parameter)

  it('should return no errors when the value is missing', () => {
    expect(validator()).toMatchSnapshot()
  })

  it('should return a deprecated error when the value is defined', () => {
    const payload = { value: 1 }
    expect(validator(payload)).toMatchSnapshot()
  })

  it('should return a deprecated error when the value is null', () => {
    const payload = { value: null }
    expect(validator(payload)).toMatchSnapshot()
  })

  it('should return a deprecated error and validation errors when the value is defined and invalid', () => {
    const payload = { value: 'string' }
    expect(validator(payload)).toMatchSnapshot()
  })
})

describe('Allow empty value', () => {
  const parameter = {
    name: 'param',
    required: true,
    allowEmptyValue: true,
    schema: {
      type: 'integer'
    }
  }

  const validator = parameterValidator(parameter)

  it('should return no errors when the value is null', () => {
    const payload = { value: null }
    expect(validator(payload)).toMatchSnapshot()
  })
})
