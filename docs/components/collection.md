Collection
==========

A Collection can be thought of as a observable array of objects with some
special properties. Collections are instantiated by providing a loader
function to load in data into the array:

```javascript
const collection = new Collection(() => api.get('/listofstuff'))
```

The collection handles lazy initialization of the list of items for you.
As with the other objects in this package the collection will expose a 
`load` function that handles calling the loader argument and replacing
the data in the underlying array with the returned results.

The collection object should behave the same as an array and it will 
support all the methods that you would expect.
