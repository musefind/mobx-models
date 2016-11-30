import assert from 'assert'
import ViewModel  from './ViewModel'
import Model from './Model'
import { isObservable } from 'mobx'

class User extends Model {}
class UserViewModel extends ViewModel {}

describe('ViewModel', () => {

  it('can initialize', () => {
    const user = User.initialize({id: 1, name: 'test'})
    const vm = new ViewModel(user)

    assert(isObservable(vm.data, 'name'))
    
    vm.data.name = 'new'
    
    vm.commit()

    assert.equal('new', user.name)
  })

  it('can reset', () => {
    const user = User.initialize({id: 1, name: 'test'})
    const vm = new ViewModel(user)

    assert(isObservable(vm.data, 'name'))

    vm.data.name = 'new'

    assert.equal('new', vm.name)

    vm.reset()

    assert.equal('test', vm.name)
  })


})
