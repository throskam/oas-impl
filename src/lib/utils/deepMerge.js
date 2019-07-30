const merge = (base, extend) => {
  if (base === undefined) {
    return extend
  }

  if (base === null) {
    return extend
  }

  if (typeof base !== typeof extend) {
    return extend
  }

  if (Array.isArray(extend)) {
    return base.map((item, index) => merge(item, extend[index]))
  }

  if (typeof extend === 'object') {
    return Object.keys(extend).reduce((acc, key) => {
      acc[key] = merge(base[key], extend[key])
      return acc
    }, base)
  }

  return extend
}

module.exports = merge
