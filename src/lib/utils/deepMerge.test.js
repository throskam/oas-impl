/* globals it, expect */

const deepMerge = require('./deepMerge')

it('should return extend if base is undefined', () => {
  const base = undefined
  const extend = { prop: 1 }
  expect(deepMerge(base, extend)).toBe(extend)
})

it('should return extend if base is null', () => {
  const base = null
  const extend = { prop: 1 }
  expect(deepMerge(base, extend)).toBe(extend)
})

it('should keep extend if base is missing the key', () => {
  const base = { a: 1 }
  const extend = { b: 1 }
  const expected = { a: 1, b: 1 }
  expect(deepMerge(base, extend)).toStrictEqual(expected)
})

it('should keep extend if base has a conflicting value of the same type', () => {
  const base = { a: 1 }
  const extend = { a: 2 }
  const expected = { a: 2 }
  expect(deepMerge(base, extend)).toStrictEqual(expected)
})

it('should keep extend if type mismatch', () => {
  const base = { a: 1 }
  const extend = { a: 'string' }
  const expected = { a: 'string' }
  expect(deepMerge(base, extend)).toStrictEqual(expected)
})

it('should merge array', () => {
  const base = { a: [1] }
  const extend = { a: [2] }
  const expected = { a: [2] }
  expect(deepMerge(base, extend)).toStrictEqual(expected)
})

it('should merge array of object', () => {
  const base = { a: [{ a: 1 }] }
  const extend = { a: [{ b: 1 }] }
  const expected = { a: [{ a: 1, b: 1 }] }
  expect(deepMerge(base, extend)).toStrictEqual(expected)
})

it('should recursively merge objects', () => {
  const base = { a: { b: 1 } }
  const extend = { a: { c: 1 } }
  const expected = { a: { b: 1, c: 1 } }
  expect(deepMerge(base, extend)).toStrictEqual(expected)
})
