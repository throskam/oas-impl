module.exports = (o, ks) => {
  return Object.keys(o).reduce((acc, key) => {
    acc[ks.find(k => k.toLowerCase() === key.toLowerCase()) || key] = o[key]
    return acc
  }, {})
}
