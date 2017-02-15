/**
 * Class Schema provides the functionality to parse javascript objects into Model instances.
 * 
 * @example
 * const authorSchema = new Schema(Author)
 * const blogSchema = new Schema(Blog, {
 *   author: authorSchema,
 * })
 *
 * const data = {
 *   id: 1,
 *     title: 'test',
 *     content: 'blog',
 *     author: {
 *     id: 1,
 *       name: 'author',
 *   }
 * }
 *
 * const res = parse(data, blogSchema)
 */
export default class Schema {
  schemaClass = true
  schemaArray = false

  /**
   * 
   * @param {Model} model
   * @param {Object} schema
   */
  constructor(model, schema) {
    this.model = model
    this.schema = schema || {}
  }

  /**
   * Define the schema 
   * @param schema
   */
  define(schema) {
    this.schema = schema || {}
  }

  /**
   * Parses a model and initializes it.
   * @param data
   * @returns {*}
   */
  parse(data) {
    if (data && data.constructor === Array) {
      return data.map(item => this.parse(item))
    } else {
      return this.model.initialize(this._parse(data))
    }
  }

  /**
   * Parses the data given without initializing it in a model.
   * @param data
   * @returns {*}
   */
  parseRaw(data) {
    if (data.constructor === Array) {
      return data.map(item => this.parseRaw(item))
    } else {
      return this._parse(data)
    }
  }

  _parse(data) {
    Object.keys(this.schema).forEach(key => {
      if (this.schema[key].schemaClass) {
        if (data[key]) {
          data[key] = this.schema[key].parse(data[key])
        } else {
          data[key] = this.schema[key].parse({})
        }
      } else {
        data[key] = this.schema[key] // set a raw element
      }
    })
    return data
  }

}

/**
 * Parse a dataset into a schema.
 * @param data
 * @param schema
 * @returns {*}
 */
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
