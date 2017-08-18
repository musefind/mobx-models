import assert from 'assert'
import Model, { State } from './Model'
import { isObservable } from 'mobx'

class DumbLoader extends Model {
  retrieve() {
    return Promise.resolve({})
  }
}
DumbLoader.className = 'DumbLoader'

class User extends Model {}
User.className = 'User'

describe('Model', () => {
  it('can initialize', () => {
    const user = User.initialize({ id: 1, name: 'Colin', className: 'User' })
    const user2 = User.initialize({ id: 1, name: 'Colin', className: 'User' })

    assert.equal(1, user.id)
    assert.equal(1, user2.id)
    assert.equal(user, user2)
  })

  it('can initialize and load', done => {
    const user = DumbLoader.initializeAndLoad({ id: 1 })

    assert.equal(1, user.id)

    setTimeout(() => {
      try {
        assert(user.loaded)
        done()
      } catch (e) {
        done(e)
      }
    }, 10)
  })

  it('is observable', () => {
    const user = User.initialize({ id: 1, name: 'Colin', className: 'User' })
    assert(isObservable(user, 'name'))
  })

  // todo: should this test pass?
  // it('assigns a default value as an observable', () => {
  //   class TestModel extends Model {
  //     name
  //   }
  //
  //   const instance = TestModel.initialize({id: 1})
  //   assert(isObservable(instance, 'name'))
  // })
})
