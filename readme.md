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

### Overview


### Example

```javascript

// Model layer
class Collab extends Model {}

class Influencer extends Model {}

class SocialProfile extends Model {}

// Schema's
const socialProfileSchema = new Schema(Influencer)

const influencerSchema = new Schema(Influencer, {
  socialProfile: socialProfileSchema, // schema should optionally handle camelizing
})

const collabSchema = new Schema(Collab, {
  influencer: influencerSchema,
})

// Get a list of collabs by using a collection.
class CollabStore
  collabs = new Collection(() => {
    return api.get('/collabs').then(res => parse(res.collabs, collabSchema))
  })
end


// Putting it all together!
const App = observer(({ collabs }) => (
  <div>
    {collabs.map(collab => 
      <div key={collab.id}>{collab.influencer.username}</div>
    )}
  </div>
))


ReactDOM.render(
  <App collabs={CollabStore.collabs} />,
  root,
)
```
