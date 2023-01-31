import Ajv from 'ajv/dist/2019'

export default class SchemaValidator {
  constructor (schema, option = {}) {
    const ajv = new Ajv()

    if (option.format) {
      Object.keys(option.format).forEach(name => {
        ajv.addFormat(name, option.format[name].validator)
      })
    }

    this.validator = ajv.compile(schema)
  }

  validate ({ value } = {}) {
    return (this.validator(value) ? [] : this.validator.errors).map(error => ({
      rule: 'schema-invalid',
      path: 'schema',
      ajv: error,
      value
    }))
  }
}
