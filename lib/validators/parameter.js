const createSchemaValidator = require('./schema')
const createContentValidator = require('./content')

const createFirstContentValidator = (content) => {
  const mediaType = Object.keys(content)[0]
  const validator = createContentValidator(content)

  return ({ value }) => {
    return validator({ value, mediaType })
  }
}

module.exports = (parameter) => {
  const validator = parameter.content ? createFirstContentValidator(parameter.content)
    : parameter.schema ? createSchemaValidator(parameter.schema)
      : null

  const error = (rule, value) => ({
    rule,
    path: 'parameter[' + parameter.name + ']',
    ...(value !== undefined && { value })
  })

  return ({ value } = {}) => {
    const errors = []

    if (value === undefined) {
      if (parameter.required) {
        errors.push(error('parameter-required'))
      }

      return errors
    }

    if (parameter.deprecated) {
      errors.push(error('parameter-deprecated', value))
    }

    if (value === null) {
      if (!parameter.allowEmptyValue) {
        errors.push(error('parameter-deny-empty-value'))
      }

      return errors
    }

    if (!validator) {
      return errors
    }

    return [
      ...errors,
      ...validator({ value }).map(error => ({
        ...error,
        path: 'parameter[' + parameter.name + '].' + error.path
      }))
    ]
  }
}
