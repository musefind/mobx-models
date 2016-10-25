const MobxModel = require('../index')
const assert = require('assert')

describe('ViewModel', () => {

  it('can set a property', () => {
    const instance = new MobxModel.Model({name: 'foo'})
    const vm = instance.viewModel()
    
    vm.name = 'foobar'

    assert.equal(vm.name, 'foobar')
    assert.equal(instance.name, 'foo')
    
    vm.reset()

    assert.equal(vm.name, 'foo')
    assert.equal(instance.name, 'foo')

    vm.name = 'foobar'

    assert.equal(vm.name, 'foobar')
    assert.equal(instance.name, 'foo')

    vm.commit()

    assert.equal(vm.name, 'foobar')
    assert.equal(instance.name, 'foobar')
  })
  
  
  it('works with arrays', () => {
    const instance = new MobxModel.Model({names: ['foo']})
    const vm = instance.viewModel()

    assert.notEqual(instance.names, vm.names)

    vm.names.push('bar')
    
    assert.equal(instance.names[0], 'foo')
    assert.equal(instance.names[1], undefined)
    assert.equal(vm.names[0], 'foo')
    assert.equal(vm.names[1], 'bar')

    vm.commit()

    assert.equal(instance.names[0], 'foo')
    assert.equal(instance.names[1], 'bar')

    assert.notEqual(instance.names, vm.names)
  })

})