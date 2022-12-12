import clamp from './clamp'

it('should clamp', () => {
  expect(clamp(0, 0, 0)).toEqual(0)
  expect(clamp(0, 1, 10)).toEqual(1)
  expect(clamp(0, -10, -1)).toEqual(-1)
})
