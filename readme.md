# Opinionated Mobx Structure

### Currently Included
- Model
- Collection
- Schema

Check out the files for basic usage.

#### Goals

- Reduce boilerplate for things like loading flags and saving functions
- Only keep one copy of a model at a given time
- First class support for using and working with forms
- Opinionated structure

#### Outstanding Questions / Ideas
- How to implement subscriptions for self updating.
- Can we generalize the model save and destroy?
- Collections, storing as list of ID's or list of models.
- Where to put collections and how to organize them.
- View model's still need to be added.

### Overview

TODO

### Example

```javascript
import { Model, Collection, Schema, parse } from 'mobx-models'
import { observer } from 'mobx'

// Model layer
class Collab extends Model {}

class Influencer extends Model {
  
  set socialProfile(val) {
    this._socialProfile = val
  }

  get socialProfile() {
    if (!this._socialProfile)
      this._socialProfile = SocialProfile.initializeAndLoad({id: this.socialProfileId});
    return this._socialProfile
  }
  
}

class SocialProfile extends Model {}

// Schema's
const socialProfileSchema = new Schema(Influencer)

const influencerSchema = new Schema(Influencer, {
  // nested model's are declared here.
  socialProfile: socialProfileSchema, // schema should optionally handle camelizing
})

const collabSchema = new Schema(Collab, {
  influencer: influencerSchema,
})

// Get a list of collabs by using a collection.
class CollabStore {
  
  // treat a collection like an observable array.
  collabs = new Collection(() => {
    // parse come's from the schema module, it parses data into the defined schema
    return api.get('/collabs').then(res => parse(res.collabs, collabSchema))
  })
  
  @observable currentCollabId = null
  
  @computed get currentCollab() {
    if (this.currentCollabId === null || this.currentCollabId === undefined) {
      // implementation choice here, either return (and cache) a new instance
      // or return null.
    } else {
      return Collab.initializeAndLoad({id: this.currentCollabId})    
    }
  }
  
}

route('/collabs/:id', (collabId) => {
  CollabStore.currentCollabId = collabId
})

route('/collabs', () => {
  CollabStore.collabs.load()
})

// Putting it all together!
const App = observer(({ collabs }) => (
  <div>
  
    {
      // Collection supports the commonly used Array functions. Additionally,
      // it will ensure the data is loaded for you as you need it, magic!
      collabs.map(collab => 
        <div key={collab.id}>{collab.influencer.username}</div>
      )
    }
  </div>
))


ReactDOM.render(
  <App collabs={CollabStore.collabs} />,
  root,
)
```
