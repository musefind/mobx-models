const assert = require('assert')
const MobxModel = require('../index')

describe('Store', () => {
  
  it('should only keep one object by ID', () => {
    const store = new MobxModel.Store(MobxModel.Model)
    
    store.findOrInitialize({id: 1, name: 't1'})
    store.findOrInitialize({id: 2, name: 't2'})
    store.findOrInitialize({id: 2, name: 't3'})
    
    assert.equal(store.objects.length, 2)
    assert.equal(store.find(2).name, 't3')
  })
  
})
