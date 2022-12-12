import Ajv from 'ajv/dist/2019'

export default (schema, option = {}) => {
  const ajv = new Ajv()

  if (option.format) {
    Object.keys(option.format).forEach(name => {
      ajv.addFormat(name, option.format[name].validator)
    })
  }

  const validator = ajv.compile(schema)

  return ({ value } = {}) => (validator(value) ? [] : validator.errors).map(error => ({
    rule: 'schema-invalid',
    path: 'schema',
    ajv: error,
    value
  }))
}
