import swagger from 'swagger-parser'

export default () => {
  return async (document) => {
    // Remove external refs.
    const bundle = await swagger.bundle(document)

    // Throws on errors.
    await swagger.validate(bundle)

    // Remove internal refs.
    return swagger.dereference(bundle)
  }
}
