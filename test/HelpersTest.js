const assert = require('assert')
const helpers = require('../helpers')

describe('helpers', () => {

  it('should camelize', () => {
    const camelized = helpers.camelize({
      my_name: 'test',
      foo: 'bar',
      foo_bar: 'baz',
    })
    
    assert.equal(camelized.myName, 'test')
    assert.equal(camelized.foo, 'bar')
    assert.equal(camelized.fooBar, 'baz')
  })

})
