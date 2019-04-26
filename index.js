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
 * @property {*} value - The invalid value
 * @property {Object} ajv - The Ajv error if available
 */
/**
 * Response Validation Error.
 * @typedef {Object} ResponseValidationError
 * @property {string} path - The data path
 * @property {string} rule - The violated rule
 * @property {*} value - The invalid value
 * @property {Object} ajv - The Ajv error if available
 */
/**
 * Option.
 * @typedef {Object} Option
 * @property {Object<string, Option.FormatOption>} format - The format option map keyed by format name
 */
/**
 * Format option.
 * @typedef {Object} FormatOption
 * @memberof Option
 * @property {Function} generator - The generator function
 * @property {Function} validator - The validator function, see https://github.com/epoberezkin/ajv#api-addformat
 */
/**
 * Coerce a request
 * @typedef requestCoercer
 * @memberof Impl
 * @method
 * @param {Request} request - The request
 * @returns {Object} The coerced request
 */
/**
 * Validate a request
 * @typedef requestValidator
 * @memberof Impl
 * @method
 * @param {Request} request - The request
 * @returns {RequestValidationError[]} The request validation errors
 */
/**
 * Coerce a response.
 * @typedef responseCoercer
 * @memberof Impl
 * @method
 * @param {Response} response - The response
 * @returns {Object} The coerced response
 */
/**
 * Generate a response.
 * @typedef responseGenerator
 * @memberof Impl
 * @method
 * @param {Object} payload - The payload
 * @param {Object} payload.mediaType - The expected response media type
 * @param {Object} payload.status - The expected response status
 * @returns {*}
 */
/**
 * Validate a response.
 * @typedef responseValidator
 * @memberof Impl
 * @method
 * @param {Response} response - The response
 * @returns {ResponseValidationError[]} The response validation errors
 */
/**
 * Implementation.
 * @typedef {Object} Impl
 * @memberof Route
 * @property {Impl.requestCoercer} requestCoercer The request coercer
 * @property {Impl.requestValidator} requestValidator The request validator
 * @property {Impl.responseCoercer} responseCoercer The response coercer
 * @property {Impl.responseGenerator} responseGenerator The response generator
 * @property {Impl.responseValidator} responseValidator The response validator
 */
/**
 * Operation.
 *
 * The operation's parameters are merged with its parent's.
 * The rest is identical to the OpenAPI specification.
 *
 * @typedef {Object} Operation
 * @memberof Route
 * @property {Object} Operation.parameters - The matched operation parameters and its parents'
 */
/**
 * Route.
 * @typedef {Object} Route
 * @property {string} path - The matched path
 * @property {string} method - The matched method
 * @property {Object} definition - The OpenAPI v3 specification
 * @property {Route.Operation} operation - The matched operation
 * @property {Route.Impl} implementation - The matched operation implementation
 */

/**
 * @module oas-impl
 * @typicalname oas
 */
const parser = require('./lib/parser')
const dispatcher = require('./lib/dispatcher')

/**
 * Dispatcher.
 *
 * Create a dispatch function.
 * @alias module:oas-impl
 * @param {Object} definition - The OpenAPI v3 definition
 * @param {Option} option - The option map
 * @returns {module:oas-impl~dispatch} The dispatcher
 */
const oas = function (document, option) {
  const parse = parser()

  // Lazy parse the document to avoid having an asynchronous module
  // instanciation which is uncommon and cumbersome.
  // The parsing occurs during the first dispatch call.
  const lazy = async (...args) => {
    const definition = await parse(document)
    resolve = dispatcher(definition, option)
    return resolve(...args)
  }

  let resolve = lazy

  /**
   * Dispatch a request.
   * @inner dispatcher
   * @function dispatch
   * @async
   * @param {string} method - The request method
   * @param {string} path - The request path
   * @returns {Route} The resolve route
   */
  return async (method, path) => resolve(method, path)
}

module.exports = oas
