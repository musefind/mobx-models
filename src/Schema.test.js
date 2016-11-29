import assert from 'assert'
import Schema, { parse } from './Schema'
import Model from './Model'
import { isObservable } from 'mobx'

class Blog extends Model {}
class Author extends Model {}

const authorSchema = new Schema(Author)
const blogSchema = new Schema(Blog, {
  author: authorSchema,
})

describe('Schema', () => {
  
  it('can parse a basic schema', () => {
    const data = {
      id: 1,
      title: 'test',
      content: 'blog',
      author: {
        id: 1,
        name: 'author',
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
          name: 'author',
        }
      }
    }


    const res = parse(data, {
      blog: blogSchema,
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
            name: 'author',
          }
        },
        {
          id: 2,
          title: 'test',
          content: 'blog',
          author: {
            id: 2,
            name: 'author',
          }
        }
      ]
    }


    const res = parse(data, {
      blogs: blogSchema.asArray(),
    })

    assert.equal(res[0].author.constructor.name, 'Author')
    assert(isObservable(res[0].author, 'id'))
    assert(res.length === 2)
  })
  
})