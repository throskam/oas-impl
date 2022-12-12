const deepClone = (o) => {
  if (typeof o !== 'object' || o === null) {
    return o
  }

  if (Array.isArray(o)) {
    return o.map(deepClone)
  }

  return Object.keys(o).reduce((acc, key) => {
    acc[key] = deepClone(o[key])
    return acc
  }, {})
}

export default deepClone
