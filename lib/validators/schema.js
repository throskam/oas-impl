const toJsonSchema = require('openapi-schema-to-json-schema')
const Ajv = require('ajv')

const ajv = new Ajv({
  schemaId: 'auto',
  unknownFormats: ['int32', 'int64']
})

ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-04.json'))

module.exports = (schema) => {
  const validator = ajv.compile(toJsonSchema(schema))

  return ({ value } = {}) => (validator(value) ? [] : validator.errors).map(error => ({
    rule: 'schema-invalid',
    path: 'schema',
    ajv: error,
    value
  }))
}
