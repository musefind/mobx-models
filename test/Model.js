const assert = require('assert')
const MobxModel = require('../index')
const isObservable = require('mobx').isObservable

describe('Model', () => {
  it('should set properties as observable', () => {
    const instance = new MobxModel.Model({name: 'foo'})
    assert(isObservable(instance, 'name'))
  })
  
  it('should initialize properties', () => {
    const fields = ['id', 'name', 'email', 'foobar']
    class Test extends MobxModel.Model {}
    Test.fields = fields
    
    const instance = new Test()

    fields.forEach(field => {
      assert(isObservable(instance, field))
      assert.equal(instance[field], null)
    })
  })

  it('should camelize properties', () => {
    class Test extends MobxModel.Model {}
    Test.camelize = true
    
    const instance = new Test({test_value: 'foo'})

    assert.equal('foo', instance.testValue)
    assert(isObservable(instance, 'testValue'))
  })

})
