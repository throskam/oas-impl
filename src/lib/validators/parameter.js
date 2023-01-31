import SchemaValidator from './schema'
import ContentValidator from './content'

const createFirstContentValidator = (content, option) => {
  const mediaType = Object.keys(content)[0]
  const validator = new ContentValidator(content, option)

  return ({ value }) => {
    return validator.validate({ value, mediaType })
  }
}

export default class ParameterValidator {
  constructor (parameter, option) {
    this.parameter = parameter
    this.validator = parameter.content
      ? createFirstContentValidator(parameter.content, option)
      : parameter.schema
        ? payload => new SchemaValidator(parameter.schema, option).validate(payload)
        : null

    this.error = (rule, value) => ({
      rule,
      path: 'parameter[' + parameter.name + ']',
      ...(value !== undefined && { value })
    })
  }

  validate ({ value } = {}) {
    const errors = []

    if (value === undefined) {
      if (this.parameter.required) {
        errors.push(this.error('parameter-required'))
      }

      return errors
    }

    if (this.parameter.deprecated) {
      errors.push(this.error('parameter-deprecated', value))
    }

    if (value === null) {
      if (!this.parameter.allowEmptyValue) {
        errors.push(this.error('parameter-deny-empty-value'))
      }

      return errors
    }

    if (!this.validator) {
      return errors
    }

    return [
      ...errors,
      ...this.validator({ value }).map(error => ({
        ...error,
        path: 'parameter[' + this.parameter.name + '].' + error.path
      }))
    ]
  }
}
