// Schema
// 
// Basic usage:
// ```
// const authorSchema = new Schema(Author)
// const blogSchema = new Schema(Blog, {
//   author: authorSchema,
// })
// 
// const data = {
//   id: 1,
//     title: 'test',
//     content: 'blog',
//     author: {
//     id: 1,
//       name: 'author',
//   }
// }
// 
// const res = parse(data, blogSchema)
// ```
// 
export default class Schema {
  schemaClass = true
  schemaArray = false

  constructor(model, schema) {
    this.model = model
    this.schema = schema || {}
  }

  define(schema) {
    this.schema = schema || {}
  }

  parse(data) {
    Object.keys(this.schema).forEach(key => {
      if (this.schema[key].schemaClass && data[key]) {
        data[key] = this.schema[key].parse(data[key])
      } else {
        data[key] = this.schema[key] // set a raw schema
      }
    })

    return this.model.initialize(data)
  }

  asArray() {
    this.schemaArray = true
    return this
  }

}

export function parse(data, schema) {
  if (schema.schemaClass) {
    if (data.constructor === Array) {
      return data.map(item => schema.parse(item))
    } else {
      return schema.parse(data)
    }
  } else {
    const key = Object.keys(schema)[0]
    if (data[key] && schema[key]) {
      return parse(data[key], schema[key])
    } else {
      return data
    }
  }
}
