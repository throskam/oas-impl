const deepClone = require('./deepClone')

it('should deep clone', () => {
  const payload = { a: { b: [{ a: { b: 1, c: null } }] } }
  const clone = deepClone(payload)
  expect(clone).not.toBe(payload)
  expect(clone.a).not.toBe(payload.a)
  expect(clone.a.b).not.toBe(payload.a.b)
  expect(clone.a.b[0]).not.toBe(payload.a.b[0])
  expect(clone.a.b[0].a).not.toBe(payload.a.b[0].a)
  expect(clone).toStrictEqual(payload)
})
