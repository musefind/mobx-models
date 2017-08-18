# Handling Single Object Loading

Often you will find yourself in the position of needing to load in single objects
at some point in the future, but not immediately. Collections provide a good
resource for handling this. You can instantiate an object that acts like an array
but wait until the data is needed to actually use it.

Objects which are only a single instance must be used differently.

## Store Level

On a store level, an observable `current{entity}Id` attribute should be used
to represent a 'current' object. The computed attribute, at `current{entity}`
should return a model depending on the observed value.

```javascript
class CollabStore {

  // Current variables should be always implemented using id's and not
  // using the object itself.
  @observable currentCollabId = null

  @computed get currentCollab() {
    if (this.currentCollabId)
      return Collab.initializeAndLoad({id: this.currentCollabId});
    return null // implementation choice here to return null or a blank object.
  }

}

// What the router functions will look like:
route('/collabs/:id', (collabId) => {
  CollabStore.currentCollabId = collabId
})
```

## Model Level

At a Model level, use Schema's to load in associations.

```javascript
const addressSchema = new Schema(Address)
const userSchema = new Schema(User, {
  address: addressSchema,
})
```

When updating, use the schema's `parseRaw` to safely retrieve nested attributes.
This method returns an object that can be safely assigned to the parent model.

```javascript
class User extends Model {
  retrieve() {
    return api.get(`/users/${this.id}`, (res) => {
      // parseRaw here includes a 
      const data = userSchema.parseRaw(res.user)
      Object.assign(this, data)
      return this
    })
  }
}
```
