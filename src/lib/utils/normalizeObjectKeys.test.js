const normalizeObjectKeys = require('./normalizeObjectKeys')

it('should return an object with senstive keys', () => {
  const object = { PRoPErtY: 1 }
  const keys = ['ProPerTy']
  const expected = { ProPerTy: 1 }

  expect(normalizeObjectKeys(object, keys)).toStrictEqual(expected)
})

it('should keep extra keys untouched', () => {
  const object = { PRoPErtY: 1 }
  const keys = []
  const expected = { PRoPErtY: 1 }

  expect(normalizeObjectKeys(object, keys)).toStrictEqual(expected)
})
