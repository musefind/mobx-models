import assert from 'assert'
import { isObservable, extendObservable, observable, spy, action, Atom } from 'mobx'
import Model from './Model'
import { logger } from './subscription'

class User extends Model {
  retrieve() {
    this.name = 'newname'
    return Promise.resolve({})
  }

  @action setName(name) {
    this.name = name
  }
}

describe('subscription', () => {

  it('explains observable properties', () => {
    const atom = new Atom("TestAtom")

    const dispose = logger()

    const user = User.initialize({id: 1, name: 'Colin'})
    // const user2 = User.initialize({id: 2, name: 'Colin'})
    // user.load()
    user.setName('newname')

    atom.reportChanged()

    dispose()
  })

})
