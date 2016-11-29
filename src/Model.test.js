import assert from 'assert'
import Model, { State } from './Model'
import { isObservable } from 'mobx'

describe('Model', () => {

  it('can initialize', () => {
    const user = Model.initialize({id: 1, name: 'Colin'})
    const user2 = Model.initialize({id: 1, name: 'Colin'})
    
    assert.equal(1, user.id)
    assert.equal(1, user2.id)
    assert.equal(user, user2)
  })

  it('is observable', () => {
    const user = Model.initialize({id: 1, name: 'Colin'})
    assert(isObservable(user, 'name'))
  })
  
})
