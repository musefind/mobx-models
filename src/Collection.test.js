import assert from 'assert'
import Model from './Model'
import Collection from './Collection'
import Schema, { parse } from './Schema'

class User extends Model {}
const userSchema = new Schema(User)

describe('Collection', () => {

  it('can load a collection', (done) => {
    const collection = new Collection(() => {
      const data = [
        { id: 1, name: 'test' },
        { id: 2, name: 'test2' },
        { id: 3, name: 'test3' },
      ]

      return Promise.resolve(parse(data, userSchema))
    })

    collection.load().then(() => {
      assert.equal(3, collection.results.length)
      done()
    }).catch(err => {
      console.warn(err)
      done(err)
    })
  })

  // it('can load a collection dynamically', (done) => {
  //   const collection = new Collection(() => {
  //     const data = [
  //       { id: 1, name: 'test' },
  //       { id: 2, name: 'test2' },
  //       { id: 3, name: 'test3' },
  //     ]
  //
  //     return Promise.resolve(parse(data, userSchema))
  //   })
  //  
  //   // note not calling load
  //   assert.equal(0, collection.results.length)
  //   setTimeout(() => {
  //     assert.equal(3, collection.results.length)
  //     done()
  //   }, 1)
  // })

})