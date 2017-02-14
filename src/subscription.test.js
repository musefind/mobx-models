import assert from 'assert'
import { isObservable, extendObservable } from 'mobx'

describe('subscription', () => {

  it('explains observable array properties', () => {
    const object = extendObservable({
      list: [1, 2, 3],
    })
    console.log(object)
  })

})
