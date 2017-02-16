# Loading Collections

TODO



```javascript
class Influencer extends Model {
  
  // default values are implemented here
  username
  socialProfileId
  name
  
  set socialProfile(val) {
    this._socialProfile = val
  }
  
  // Social profile object is autoloaded here for us. This is optional.
  get socialProfile() {
    if (!this._socialProfile)
      this._socialProfile = SocialProfile.initializeAndLoad({id: this.socialProfileId});
    return this._socialProfile
  }
  
  // how retrieve should be implemented
  retrieve() {
    return api.get(`/social_profiles/${this.id}`, (res) => {
      const data = socialProfileSchema.parseRaw(res.socialProfile)
      Object.assign(this, data)
      return this
    })
  }
  
}


// Schema's:
const socialProfileSchema = new Schema(Influencer)

const influencerSchema = new Schema(Influencer, {
  // nested model's are declared here.
  socialProfile: socialProfileSchema, // schema should optionally handle camelizing
})

const collabSchema = new Schema(Collab, {
  influencer: influencerSchema,
})


// Stores:
class CollabStore {
  
  // Get a list of collabs by using a collection. treat a collection like 
  // an observable array.
  collabs = new Collection(() => {
    // parse come's from the schema module, it parses data into the defined schema
    return api.get('/collabs').then(res => parse(res.collabs, collabSchema))
  })
  
  // This is an optional variable for 'new' models instantiated with forms.
  @observable newCollab = null
  
}
```
