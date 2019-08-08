const createParameterParser = require('./parameterParser')

const schema = {
  object: {
    type: 'object',
    properties: {
      foo: {
        type: 'integer'
      },
      bar: {
        type: 'integer'
      }
    }
  },
  array: {
    type: 'array',
    items: {
      type: 'integer'
    }
  },
  primitive: {
    type: 'string'
  },
  empty: {
    type: 'string'
  }
}

const data = [
  [
    'matrix',
    ['path'],
    [
      ['empty', 'should return null', null, [[';param', null], [';param', true]]],
      ['primitive', 'should return the value asis', '1,2,3', [[';param=1,2,3', null], [';param=1,2,3', true]]],
      ['array', 'should return an array', ['1', '2', '3'], [[';param=1,2,3', null], [';param=1;param=2;param=3', true]]],
      ['object', 'should return an object', { foo: '1', bar: '2' }, [[';param=foo,1,bar,2', null], [';foo=1;bar=2', true]]]
    ]
  ],
  [
    'label',
    ['path'],
    [
      ['empty', 'should return null', null, [['.', null], ['.', true]]],
      ['primitive', 'should return the value asis', '1.2.3', [['.1.2.3', null], ['.1.2.3', true]]],
      ['array', 'should return an array', ['1', '2', '3'], [['.1,2,3', null], ['.1.2.3', true]]],
      ['object', 'should return an object', { foo: '1', bar: '2' }, [['.foo.1.bar.2', null], ['.foo=1.bar=2', true]]]
    ]
  ],
  [
    'form',
    ['query', 'cookie'],
    [
      ['empty', 'should return null', null, [['', false], ['value', true]]],
      ['primitive', 'should return the value asis', '1,2,3', [['1,2,3', false], ['value', true]]],
      ['array', 'should return an array', ['1', '2', '3'], [['1,2,3', false], ['value', true]]],
      ['object', 'should return an object', { foo: '1', bar: '2' }, [['foo,1,bar,2', false], ['value', true]]]
    ]
  ],
  [
    'simple',
    ['path', 'header'],
    [
      ['empty', 'should return null', null, [['', null], ['', true]]],
      ['primitive', 'should return the value asis', '1,2,3', [['1,2,3', null], ['1,2,3', true]]],
      ['array', 'should return an array', ['1', '2', '3'], [['1,2,3', null], ['1,2,3', true]]],
      ['object', 'should return an object', { foo: '1', bar: '2' }, [['foo,1,bar,2', null], ['foo=1,bar=2', true]]]
    ]
  ],
  [
    'spaceDelimited',
    ['query'],
    [
      ['empty', 'should return null', null, [['', null], ['value', true]]],
      ['primitive', 'should return the value asis', '1 2 3', [['1 2 3', null], ['value', true]]],
      ['array', 'should return an array', ['1', '2', '3'], [['1 2 3', null], ['value', true]]],
      ['object', 'should return an object', { foo: '1', bar: '2' }, [['foo 1 bar 2', null], ['value', true]]]
    ]
  ],
  [
    'pipeDelimited',
    ['query'],
    [
      ['empty', 'should return null', null, [['', null], ['value', true]]],
      ['primitive', 'should return the value asis', '1|2|3', [['1|2|3', null], ['value', true]]],
      ['array', 'should return an array', ['1', '2', '3'], [['1|2|3', null], ['value', true]]],
      ['object', 'should return an object', { foo: '1', bar: '2' }, [['foo|1|bar|2', null], ['value', true]]]
    ]
  ]
]

describe.each(data)('%s', (style, ins, cases) => {
  describe.each(cases)('%s', (type, text, expected, values) => {
    describe.each(ins)('%s', (in_) => {
      it.each(values)(text + ' when value "%s" and explode "%s"', (value, explode) => {
        const parameter = {
          name: 'param',
          in: in_,
          schema: schema[type],
          style,
          ...(explode === undefined ? {} : { explode })
        }

        const parser = createParameterParser(parameter)

        expect(parser(value)).toStrictEqual(value === 'value' ? value : expected)
      })
    })

    const others = ['path', 'query', 'header', 'cookie'].filter(in_ => !ins.includes(in_))

    describe.each(others)('%s', (in_) => {
      it.each([null, true, false])('should return the value asis when explode "%s"', (explode) => {
        const parameter = {
          name: 'param',
          in: in_,
          schema: schema[type],
          style,
          ...(explode === undefined ? {} : { explode })
        }

        const parser = createParameterParser(parameter)
        const value = 'untouched'

        expect(parser(value)).toStrictEqual(value)
      })
    })
  })
})
