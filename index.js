/**
 * @module oas-impl
 * @typicalname oas
 */

/**
 * OpenAPI v3 operation.
 *
 * The operation's parameters are merged with its parent's.
 *
 * @typedef {Object} operation
 */

/**
 * Route.
 * @typedef {Object} Route
 * @property {Object} definition - The OpenAPI v3 specification
 * @property {string} path - The matched path
 * @property {string} method - The matched method
 * @property {module:oas-impl~operation} operation - The matched operation
 * @property {Object} operation.parameters - The matched operation parameters and its parents'
 */

/**
 * Request.
 * @typedef {Object} Request
 * @property {Object} path - The request path
 * @property {Object} query - The request query
 * @property {Object} header - The request header
 * @property {Object} cookie - The request cookie
 * @property {Object} content - The request content
 * @property {Object} mediaType - The request media type
 */

/**
 * Response.
 * @typedef {Object} Response
 * @property {Object} header - The response header
 * @property {Object} content - The response content
 * @property {Object} mediaType - The response media type
 * @property {Object} status  - The response status
 */

/**
 * Request Validation Error
 * @typedef {Object} RequestValidationError
 * @property {string} path - The data path
 * @property {string} rule - The violated rule
 * @property {mixed} value - The invalid value
 * @property {Object} ajv - The Ajv error if available
 */

/**
 * Response Validation Error.
 * @typedef {Object} ResponseValidationError
 * @property {string} path - The data path
 * @property {string} rule - The violated rule
 * @property {mixed} value - The invalid value
 * @property {Object} ajv - The Ajv error if available
 */

/**
 * Response Generator Option.
 * @typedef {Object} ResponseGeneratorOption
 * @property {Object.<string, fn(schema, option)>} generator - The generator map keyed by schema format
 */

/**
 * Dispatch a request.
 * @typedef dispatcher
 * @function
 * @param {string} method - The request method
 * @param {string} path - The request path
 * @returns {module:oas-impl~Route} The resolve route
 */
/**
 * Create a dispatcher
 * @function
 * @param {Object} definition - The OpenAPI v3 definition
 * @returns {module:oas-impl~dispatcher} The dispatcher
 */
module.exports.dispatcher = require('./lib/dispatcher')
/**
 * Parse a document OpenAPI v3
 * @typedef parser
 * @function
 * @param {string} document - Anything that swagger-parser may handle
 * @returns {Object} The validated, dereferenced and bundle specification
 */
/**
 * Create a parser
 * @function
 * @returns {module:oas-impl~parser} The parser
 */
module.exports.parser = require('./lib/parser')
/**
 * Coerce a request
 * @typedef requestCoercer
 * @function
 * @param {module:oas-impl~Request} request - The request
 * @returns {Object} The coerced request
 */
/**
 * Create a request coercer
 * @function
 * @param {module:oas-impl~operation} operation - The operation
 * @returns {module:oas-impl~requestCoercer} The request coercer
 */
module.exports.requestCoercer = require('./lib/requestCoercer')
/**
 * Validator a request
 * @typedef requestValidator
 * @function
 * @param {module:oas-impl~Request} request - The request
 * @returns {module:oas-impl~RequestValidationError[]} The request validation errors
 */
/**
 * Create a request validator
 * @function
 * @param {module:oas-impl~operation} operation - The operation
 * @returns {module:oas-impl~requestValidator} The request validator
 */
module.exports.requestValidator = require('./lib/requestValidator')
/**
 * Coerce a response.
 * @typedef responseCoercer
 * @function
 * @param {module:oas-impl~Response} response - The response
 * @returns {Object} The coerced response
 */
/**
 * Create a response coercer.
 * @function
 * @param {module:oas-impl~operation} operation - The operation
 * @returns {module:oas-impl~responseCoercer} The response coercer
 */
module.exports.responseCoercer = require('./lib/responseCoercer')
/**
 * Generate a response.
 * @typedef responseGenerator
 * @function
 * @param {Object} payload - The payload
 * @param {Object} payload.mediaType - The expected response media type
 * @param {Object} payload.status - The expected response status
 * @returns {*}
 */
/**
 * Create a response generator.
 * @function
 * @param {module:oas-impl~operation} operation - The operation
 * @param {module:oas-impl~ResponseGeneratorOption} option - The generator option map
 * @returns {module:oas-impl~responseGenerator} The response generator
 */
module.exports.responseGenerator = require('./lib/responseGenerator')
/**
 * Validate a response.
 * @typedef responseValidator
 * @function
 * @param {module:oas-impl~Response} response - The response
 * @returns {module:oas-impl~ResponseValidationError[]} The response validation errors
 */
/**
 * Create a response validator.
 * @function
 * @param {module:oas-impl~operation} operation - The operation
 * @returns {module:oas-impl~responseValidator} The response validator
 */
module.exports.responseValidator = require('./lib/responseValidator')
