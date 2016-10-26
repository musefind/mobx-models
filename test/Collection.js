const assert = require('assert')
const MobxModel = require('../index')

describe('Collection', () => {
  
  it('should load a collection', (done) => {
    const data = [
      {id: 1, name: 'o1'},
      {id: 3, name: 'o2'},
      {id: 3, name: 'o3'},
    ]
    
    const store = new MobxModel.Store(MobxModel.Model)
    const collection = new MobxModel.Collection(store, () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => { resolve(data) }, 30)
      })
    })

    collection.results
    assert.equal(collection.length, 0)
    assert.equal(collection.loading, true)
    
    setTimeout(() => {
      assert.equal(collection.length, 3)
      assert.equal(collection.loading, false)
      
      let c = 0
      collection.forEach(() => { c++ })
      assert.equal(c, 3)
      
      assert.equal(collection.map(a => a).length, 3)
      
      assert.equal(store.objects.size, 2)
      done()
    }, 50)
  })
  
  it('should remove from a collection', (done) => {
    const data = [
      {id: 1, name: 'o1'},
      {id: 3, name: 'o2'},
      {id: 3, name: 'o3'},
    ]

    const store = new MobxModel.Store(MobxModel.Model)
    const collection = new MobxModel.Collection(store, () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => { resolve(data) }, 1)
      })
    })
    
    collection.load()
    
    setTimeout(() => {
      assert.equal(collection.length, 3)
      store.remove(1)
      assert.equal(collection.length, 2)
      done()
    }, 3)
  })
  
})
