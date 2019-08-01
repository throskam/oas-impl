const mediaTypeMatcher = require('./mediaTypeMatcher')

describe('Match', () => {
  const mediaTypes = [
    'text/*',
    '*/*',
    'text/plain'
  ]

  it('should return text/plain', () => {
    expect(mediaTypeMatcher(mediaTypes, 'text/plain')).toEqual('text/plain')
  })

  it('should return text/*', () => {
    expect(mediaTypeMatcher(mediaTypes, 'text/css')).toEqual('text/*')
  })

  it('should return */*', () => {
    expect(mediaTypeMatcher(mediaTypes, 'application/json')).toEqual('*/*')
  })
})

describe('Undefined', () => {
  const mediaTypes = [
    'text/plain'
  ]

  it('should return undefined', () => {
    expect(mediaTypeMatcher(mediaTypes, 'text/css')).toBeUndefined()
  })
})
