import { extendObservable } from 'mobx'
import Base from './Base'

export const State = {}
const assign = Object.assign

/**
 * Class Model.
 * The model is the smallest piece of state, it should be used to represent a single object coming from the backend.
 * 
 * TODO: Implement LoadDispatch and reactive loading interface.
 * 
 * @extends Base
 * @example
 * class Influencer extends Model {
 *   
 *   // default values are implemented here
 *   username
 *   socialProfileId
 *   name
 *   
 *   set socialProfile(val) {
 *     this._socialProfile = val
 *   }
 *   
 *   // Social profile object is autoloaded here for us. This is optional.
 *   get socialProfile() {
 *     if (!this._socialProfile)
 *       this._socialProfile = SocialProfile.initializeAndLoad({id: this.socialProfileId});
 *     return this._socialProfile
 *   }
 *   
 *   // how retrieve should be implemented
 *   retrieve() {
 *     return api.get(`/social_profiles/${this.id}`, (res) => {
 *       const data = socialProfileSchema.parseRaw(res.socialProfile)
 *       Object.assign(this, data)
 *       return this
 *     })
 *   }
 * }
 */
export default class Model extends Base {
  id

  /**
   * Initialize get's an instance of a model, ensuring to return the same instance if it already exists.
   * @param rawData
   * @returns {Model}
   */
  static initialize(rawData) {
    // if this is a User model, it's instances will be a State.User[id]
    if (!State[this.name]) State[this.name] = {};
    // try and find the object
    let object = State[this.name][rawData.id]
    const data = this.processData(rawData)
    if (object && object.loading) {
      return object
    } else if (object) {
      assign(object, data)                                // update the object if it exists already
    } else if (data.id) {
      object = extendObservable(new this(data), data)     // create a new one
      State[this.name][object.id] = object                // add it to the global state
    } else {
      object = extendObservable(new this(data), data)     // create an 'untracked' model, won't be save in State cuz no ID.
    }

    return object
  }

  /**
   * Initialize's the model and then calls load.
   * @param data
   * @returns {Model}
   */
  static initializeAndLoad(data) {
    if (!data.id) 
      throw new Error("initializeAndLoad must be called with an id");
    const object = this.initialize(data)
    object.load()
    return object
  }

  /**
   * Process the data before initializing it.
   * @param raw
   * @returns {Object}
   */
  static processData(raw) {
    return raw
  }
  
  /**
   * This method is called by load, it should update the model's own internal state and then return a promise.
   * @returns {Promise}
   */
  retrieve() { return Promise.reject('Not Implemented') }
  
  /**
   * Save should be implemented to save this object and update itself
   * @returns {Promise}
   */
  save() { return Promise.reject('Not Implemented') }

  /**
   * Destroy should delete the object in the backend and in the state tree
   * @returns {Promise}
   */
  destroy() { return Promise.reject('Not Implemented') }

  /**
   * load will call retrieve and then setLoaded. Call force to ensure the model will reload.
   * @param force
   * @returns {Promise}
   */
  load(force) {
    if (this.loaded && !force) Promise.resolve(this);

    this.setLoading()
    return this.retrieve().then(() => {
      this.setLoaded()
      return this
    })
  }
  
}
