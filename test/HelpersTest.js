const assert = require('assert')
const helpers = require('../helpers')
const assertReacts = require('./helpers').assertReacts
const mobx = require('mobx')

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
  
  it('should assign reactively', (done) => {
    
    const observed = {}
    mobx.extendObservable(observed, {
      name: 'foo',
    })

    assertReacts(observed, 'name', done, () => {
      helpers.assignObservables(observed, {name: 'bar'})
    })
  })

  it('should assign reactively to a map', (done) => {

    const observed = {}
    mobx.extendObservable(observed, {
      test: {name: 'foo'},
    })

    assertReacts(observed.test, 'name', done, () => {
      helpers.assignObservables(observed, {test: {name: 'bar'}})
    })
  })

  it('should assign reactively to an array', (done) => {

    const observed = {}
    mobx.extendObservable(observed, {
      test: ['foo', 'bar'],
    })

    assertReacts(observed, 'test', done, () => {
      helpers.assignObservables(observed, {test: ['a', 'b', 'c']})
    })
  })
  
})
