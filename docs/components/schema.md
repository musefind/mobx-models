Schema
======

The schema is a way of instantiating a model from raw data. It can perform basic.

#### Example
```javascript
const authorSchema = new Schema(Author)
const blogSchema = new Schema(Blog, {
  author: authorSchema,
})

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
```
