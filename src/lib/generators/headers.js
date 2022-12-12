import createParameterGenerator from './parameter'

export default (headers, option) => {
  const generators = Object.keys(headers).map(name => {
    const generator = createParameterGenerator({ ...headers[name], name }, option)

    return header => ({ name, value: generator() })
  })

  return () => {
    const generated = generators.reduce((acc, generator) => {
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
