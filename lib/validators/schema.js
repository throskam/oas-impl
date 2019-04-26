const toJsonSchema = require('openapi-schema-to-json-schema')
const Ajv = require('ajv')

module.exports = (schema, option = {}) => {
  const ajv = new Ajv({
    schemaId: 'auto'
  })

  ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-04.json'))

  if (option.format) {
    Object.keys(option.format).forEach(name => {
      ajv.addFormat(name, option.format[name].validator)
    })
  }

  const validator = ajv.compile(toJsonSchema(schema))

  return ({ value } = {}) => (validator(value) ? [] : validator.errors).map(error => ({
    rule: 'schema-invalid',
    path: 'schema',
    ajv: error,
    value
  }))
}
