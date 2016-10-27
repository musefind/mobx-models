const assert = require('assert')
const MobxModel = require('../index')

describe('MobXModel', () => {
  
  it('handles nested objects', () => {
    class Author extends MobxModel.Model {}
    class Blog extends MobxModel.Model {
      process(data) {
        data.author = AuthorStore.findOrInitialize(data.author)
        return data
      }
    }

    const AuthorStore = new MobxModel.Store(Author)
    const BlogStore = new MobxModel.Store(Blog)

    const data = [
      {id: 1, content: 'foobar', author: {id: 1, name: 'foobar'}},
      {id: 2, content: 'foobar', author: {id: 2, name: 'foobar'}},
    ]

    const blogs = new MobxModel.Collection(BlogStore, () => {
      return Promise.resolve(data)
    })

    blogs.forEach(blog => {
      assert.equal(blog.author.constructor.name, 'Author')
    })
  })
  
})
