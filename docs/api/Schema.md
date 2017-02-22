# Schema

Class Schema provides the functionality to parse javascript objects into Model instances.

**Examples**

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

## constructor

**Parameters**

-   `model` **Model** 
-   `schema` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

## define

Define the schema

**Parameters**

-   `schema`  

## parse

Parses a model and initializes it.

**Parameters**

-   `data`  

Returns **Any** 

## parseRaw

Parses the data given without initializing it in a model.

**Parameters**

-   `data`  

Returns **Any** 

# parse

Parse a dataset into a schema.

**Parameters**

-   `data`  
-   `schema`  

Returns **Any** 
