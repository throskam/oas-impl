import ParameterGenerator from './parameter'

export default class HeadersGenerator {
  constructor (headers, option) {
    this.generators = Object.keys(headers).map(name => {
      const generator = new ParameterGenerator({ ...headers[name], name }, option)

      return header => ({ name, value: generator.generate() })
    })
  }

  generate () {
    const generated = this.generators.reduce((acc, generator) => {
      const generated = generator()

      acc[generated.name] = generated.value

      return acc
    }, {})

    if (Object.keys(generated).length === 0) {
      return undefined
    }

    return generated
  }
}
