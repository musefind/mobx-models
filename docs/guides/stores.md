# Stores

TODO

```javascript
// Stores:
class CollabStore {
  
  // Get a list of collabs by using a collection. treat a collection like 
  // an observable array.
  collabs = new Collection(() => {
    // parse come's from the schema module, it parses data into the defined schema
    return api.get('/collabs').then(res => parse(res.collabs, collabSchema))
  })
  
  // Current variables should be always implemented using id's and not
  // using the object itself.
  @observable currentCollabId = null
  
  @computed get currentCollab() {
    if (this.currentCollabId === null || this.currentCollabId === undefined) {
      // implementation choice here, either return (and cache) a new instance
      // or return null.
    } else {
      return Collab.initializeAndLoad({id: this.currentCollabId})    
    }
  }
  
  // This is an optional variable for 'new' models instantiated with forms.
  @observable newCollab = null
  
}
```
