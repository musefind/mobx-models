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

})