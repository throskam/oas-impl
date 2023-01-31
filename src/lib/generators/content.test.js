import ContentGenerator from './content'

describe('Empty', () => {
  const content = {}

  const generator = new ContentGenerator(content)

  it('should return undefined when no schema is defined', () => {
    expect(generator.generate()).toBeUndefined()
  })
})

describe('Media type', () => {
  const content = {
    'application/json': {
      schema: {
        type: 'integer',
        example: 1234
      }
    }
  }

  const generator = new ContentGenerator(content)

  it('should return the application/json example when the media type is application/json', () => {
    const payload = { mediaType: 'application/json' }
    const expected = 1234
    expect(generator.generate(payload)).toEqual(expected)
  })

  it('should return undefined when the media type is foo/bar', () => {
    const payload = { mediaType: 'foo/bar' }
    expect(generator.generate(payload)).toBeUndefined()
  })

  it('should return undefined when the media type is missing', () => {
    expect(generator.generate()).toBeUndefined()
  })
})
