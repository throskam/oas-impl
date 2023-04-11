import ContentCoercer from './content'
import SchemaCoercer from './schema'
import createParameterParser from './../utils/parameterParser'

export default class ParameterCoercer {
  constructor (parameter) {
    this.parameter = parameter

    if (parameter.content) {
      this.coercer = new ContentCoercer(parameter.content)
    } else if (parameter.schema) {
      this.coercer = new SchemaCoercer(parameter.schema)
    }

    // TODO: move parser in this class.
    this.parser = createParameterParser(parameter)
  }

  coerce ({ value } = {}) {
    if (value === undefined) {
      return value
    }

    const parsed = this.parser(value)

    if (!this.coercer) {
      return parsed
    }

    if (this.parameter.content) {
      return this.coercer.coerce({ value: parsed, mediaType: Object.keys(this.parameter.content)[0] })
    }

    return this.coercer.coerce({ value: parsed })
  }
}
