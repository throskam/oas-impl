const defaultStyles = {
  query: 'form',
  path: 'simple',
  header: 'simple',
  cookie: 'form'
}

const objectify = (value, delimiter) => {
  const array = value.split(delimiter)
  const size = 2

  const chunks = Array.from({ length: Math.ceil(array.length / size) }, (v, i) =>
    array.slice(i * size, i * size + size)
  )

  return chunks.reduce((acc, chunk) => {
    acc[chunk[0]] = chunk[1]
    return acc
  }, {})
}

export default (parameter) => {
  const style = parameter.style || defaultStyles[parameter.in]
  const explode = parameter.explode === undefined ? style === 'form' : parameter.explode
  const type = parameter.content ? parameter.content[Object.keys(parameter.content)[0]].type : parameter.schema ? parameter.schema.type : null

  return (value) => {
    if (style === 'matrix') {
      if (!['path'].includes(parameter.in)) {
        return value
      }

      if (value === ';' + parameter.name) {
        return null
      }

      if (type === 'object') {
        if (explode) {
          return value.slice(1).split(';').map(part => part.split('=')).reduce((acc, chunk) => {
            acc[chunk[0]] = chunk[1]
            return acc
          }, {})
        }

        return objectify(value.replace(new RegExp('^;' + parameter.name + '='), ''), ',')
      }

      if (type === 'array') {
        if (explode) {
          return value.slice(1).split(';').map(part => part.slice(parameter.name.length + 1))
        }

        return value.replace(new RegExp('^;' + parameter.name + '='), '').split(',')
      }

      return value.replace(new RegExp('^;' + parameter.name + '='), '')
    }

    if (style === 'label') {
      if (!['path'].includes(parameter.in)) {
        return value
      }

      if (value === '.') {
        return null
      }

      if (type === 'object') {
        if (explode) {
          return value.slice(1).split('.').map(part => part.split('=')).reduce((acc, chunk) => {
            acc[chunk[0]] = chunk[1]
            return acc
          }, {})
        }

        return objectify(value.slice(1), '.')
      }

      if (type === 'array') {
        if (explode) {
          return value.slice(1).split('.')
        }

        return value.slice(1).split(',')
      }

      return value.replace(/^./, '')
    }

    if (style === 'form') {
      if (!['query', 'cookie'].includes(parameter.in)) {
        return value
      }

      if (value === '') {
        return null
      }

      if (type === 'object') {
        if (!explode) {
          return objectify(value, ',')
        }
      }

      if (type === 'array') {
        if (!explode) {
          return value.split(',')
        }
      }
    }

    if (style === 'simple') {
      if (!['path', 'header'].includes(parameter.in)) {
        return value
      }

      if (value === '') {
        return null
      }

      if (type === 'object') {
        if (explode) {
          return value.split(',').map(part => part.split('=')).reduce((acc, part) => {
            acc[part[0]] = part[1]
            return acc
          }, {})
        }

        return objectify(value, ',')
      }

      if (type === 'array') {
        return value.split(',')
      }
    }

    if (style === 'spaceDelimited') {
      if (!['query'].includes(parameter.in)) {
        return value
      }

      if (value === '') {
        return null
      }

      if (type === 'object') {
        if (!explode) {
          return objectify(value, ' ')
        }
      }

      if (type === 'array') {
        if (!explode) {
          return value.split(' ')
        }
      }
    }

    if (style === 'pipeDelimited') {
      if (!['query'].includes(parameter.in)) {
        return value
      }

      if (value === '') {
        return null
      }

      if (type === 'object') {
        if (!explode) {
          return objectify(value, '|')
        }
      }

      if (type === 'array') {
        if (!explode) {
          return value.split('|')
        }
      }
    }

    return value
  }
}
