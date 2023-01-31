import ContentCoercer from './content'
import SchemaCoercer from './schema'
import createParameterParser from './../utils/parameterParser'

const createFirstContentCoercer = (content) => {
  const mediaType = Object.keys(content)[0]
  const coercer = new ContentCoercer(content)

  return ({ value }) => coercer.coerce({ value, mediaType })
}

export default class ParameterCoercer {
  constructor (parameter) {
    this.coercer = parameter.content
      ? createFirstContentCoercer(parameter.content)
      : parameter.schema
        ? (payload) => (new SchemaCoercer(parameter.schema)).coerce(payload)
        : null

    this.parser = createParameterParser(parameter)
  }

  coerce ({ value } = {}) {
    if (value === undefined) {
      return value
    }

    const parsed = this.parser(value)

    return this.coercer ? this.coercer({ value: parsed }) : parsed
  }
}
