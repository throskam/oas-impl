import ParametersCoercer from './coercers/parameters'
import RequestBodyCoercer from './coercers/requestBody'

export default class RequestCoercer {
  constructor (operation) {
    this.parametersCoercer = operation.parameters ? new ParametersCoercer(operation.parameters) : null
    this.requestBodyCoercer = operation.requestBody ? new RequestBodyCoercer(operation.requestBody) : null
  }

  coerce ({ path, query, header, cookie, content, mediaType } = {}) {
    const body = this.requestBodyCoercer ? this.requestBodyCoercer.coerce({ content, mediaType }) : content

    const coerced = {
      ...(this.parametersCoercer
        ? this.parametersCoercer.coerce({ path, query, header, cookie })
        : {
            ...(path && { path }),
            ...(query && { query }),
            ...(header && { header }),
            ...(cookie && { cookie })
          }),
      ...(body !== undefined && { content: body })
    }

    if (Object.keys(coerced).length === 0) {
      return undefined
    }

    return coerced
  }
}
