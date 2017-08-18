import assert from 'assert'
import Schema, { parse } from './Schema'
import Model from './Model'
import { isObservable } from 'mobx'

class Blog extends Model {}
class Author extends Model {}

const authorSchema = new Schema(Author)
const blogSchema = new Schema(Blog, {
  author: authorSchema
})
Author.className = 'Author'
Blog.className = 'Blog'

describe('Schema', () => {
  it('can parse a basic schema', () => {
    const data = {
      id: 1,
      title: 'test',
      content: 'blog',
      author: {
        id: 1,
        name: 'author'
      }
    }

    const res = parse(data, blogSchema)

    assert.equal(res.author.constructor.name, 'Author')
    assert(isObservable(res.author, 'id'))
  })

  it('can parse a nested schema', () => {
    const data = {
      blog: {
        id: 1,
        title: 'test',
        content: 'blog',
        author: {
          id: 1,
          name: 'author'
        }
      }
    }

    const res = parse(data, {
      blog: blogSchema
    })

    assert.equal(res.author.constructor.name, 'Author')
    assert(isObservable(res.author, 'id'))
  })

  it('can parse a list', () => {
    const data = {
      blogs: [
        {
          id: 1,
          title: 'test',
          content: 'blog',
          author: {
            id: 1,
            name: 'author'
          }
        },
        {
          id: 2,
          title: 'test',
          content: 'blog',
          author: {
            id: 2,
            name: 'author'
          }
        }
      ]
    }

    const res = parse(data, {
      blogs: blogSchema
    })

    // alternative api
    const res2 = blogSchema.parse(data.blogs)

    assert.equal(res[0].author.constructor.name, 'Author')
    assert(isObservable(res[0].author, 'id'))
    assert(res.length === 2)

    assert.equal(res2[0].author.constructor.name, 'Author')
    assert(isObservable(res2[0].author, 'id'))
    assert(res2.length === 2)
  })

  it('parses a raw single object', () => {
    const data = {
      id: 1,
      title: 'test',
      content: 'blog',
      author: {
        id: 1,
        name: 'author'
      }
    }

    const raw = blogSchema.parseRaw(data)
    assert.equal('Object', raw.constructor.name)
    assert.equal(raw.author.constructor.name, 'Author')
  })
})
