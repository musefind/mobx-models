const assert = require('assert')
const MobxModel = require('../index')
const isObservable = require('mobx').isObservable

describe('Model', () => {
  it('should set properties as observable', () => {
    const instance = new MobxModel.Model()
    instance.init({name: 'foo'})
    assert(isObservable(instance, 'name'))
  })

  it('should camelize properties', () => {
    class Test extends MobxModel.Model {}
    Test.camelize = true
    
    const instance = new Test()
    
    instance.init({test_value: 'foo'})
    assert.equal('foo', instance.testValue)
    assert(isObservable(instance, 'testValue'))
  })
})
