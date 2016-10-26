const assert = require('assert')
const MobxModel = require('../index')
const isObservable = require('mobx').isObservable
const camelize = require('../helpers').camelize
const assertReacts = require('./helpers').assertReacts

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
    class Test extends MobxModel.Model {
      static process(data) {
        return camelize(data)
      }
    }
    const instance = new Test({test_value: 'foo'})

    assert.equal('foo', instance.testValue)
    assert(isObservable(instance, 'testValue'))
  })

  it('should trigger reaction of scalar', (done) => {
    class Test extends MobxModel.Model {}
    Test.fields = ['id', 'testing']

    const instance = new Test()

    assertReacts(instance, 'testing', done, () => {
      instance.testing = true
    })
  })

  it('should trigger reaction of object', (done) => {
    class Test extends MobxModel.Model {}
    Test.fields = ['id', 'testing']
  
    const instance = new Test({testing: {a: '1'}})
  
    assertReacts(instance, 'testing', done, () => {
      instance.testing = {a: '2'}
    })
  })
  
  it('should trigger reaction of array', (done) => {
    class Test extends MobxModel.Model {}
    Test.fields = ['id', 'testing']
  
    const instance = new Test({testing: []})
  
    assertReacts(instance, 'testing', done, () => {
      instance.testing = ['a']
    })
  })
  
  it('should trigger a reaction by assigning', (done) => {
    class Test extends MobxModel.Model {}
    
    const TestStore = new MobxModel.Store(Test)
    Test.fields = ['id', 'testing', 'test']
    Test.nestedStores.test = TestStore

    const instance = new Test({testing: 'a', test: {id: 2, testing: 'a'}})
    
    assertReacts(instance.test, 'testing', done, () => {
      instance.assign({test: {testing: 'b'}})
    })
  })
  
})
