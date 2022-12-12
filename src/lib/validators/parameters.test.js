import createParametersValidator from './parameters'

describe('Path', () => {
  const parameters = [{
    name: 'param',
    in: 'path',
    required: true
  }]

  const validator = createParametersValidator(parameters)

  it('should return no errors when the value is defined', () => {
    const payload = {
      path: {
        param: 1
      }
    }

    expect(validator(payload)).toMatchSnapshot()
  })

  it('should return required error when the value is missing', () => {
    expect(validator()).toMatchSnapshot()
  })
})

describe('Query', () => {
  const parameters = [{
    name: 'param',
    in: 'query',
    required: true
  }]

  const validator = createParametersValidator(parameters)

  it('should return no errors when the value is defined', () => {
    const payload = {
      query: {
        param: 1
      }
    }

    expect(validator(payload)).toMatchSnapshot()
  })

  it('should return required error when the value is missing', () => {
    expect(validator()).toMatchSnapshot()
  })
})

describe('Header', () => {
  const parameters = [{
    name: 'x-foo-bar',
    in: 'header',
    required: true
  }]

  const validator = createParametersValidator(parameters)

  it('should return no errors when the value is defined', () => {
    const payload = {
      header: {
        'x-foo-bar': 1
      }
    }

    expect(validator(payload)).toMatchSnapshot()
  })

  it('should return required error when the value is missing', () => {
    expect(validator()).toMatchSnapshot()
  })

  it('should return no errors when the header case missmatch', () => {
    const payload = {
      header: {
        'X-FoO-bAR': 1
      }
    }

    expect(validator(payload)).toMatchSnapshot()
  })
})

describe('Cookie', () => {
  const parameters = [{
    name: 'name',
    in: 'cookie',
    required: true
  }]

  const validator = createParametersValidator(parameters)

  it('should return no errors when the value is defined', () => {
    const payload = {
      cookie: {
        name: 1
      }
    }

    expect(validator(payload)).toMatchSnapshot()
  })

  it('should return required error when the value is missing', () => {
    expect(validator()).toMatchSnapshot()
  })
})
