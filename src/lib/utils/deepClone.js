const deepClone = (o) => {
  if (Array.isArray(o)) {
    return o.map(deepClone)
  }

  if (typeof o !== 'object') {
    return o
  }

  return Object.keys(o).reduce((acc, key) => {
    acc[key] = deepClone(o[key])
    return acc
  }, {})
}

module.exports = deepClone
