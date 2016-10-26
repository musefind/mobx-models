import Model from '../../../../Model'
import AuthorStore from '../stores/AuthorStore'
import { getSinglePost } from '../api'

export default class Blog extends Model {
  static fields = ['id', 'title', 'content', 'author_id']
  static nestedStores = {
    author: AuthorStore,
  }
 
  static process(data) {
    if (data.author_id && !data.author) {
      data.author = {id: data.author_id, name: null}
    }
    return data
  }
  
  retrieve() {
    return getSinglePost(this.id)
  }
  
  insert() {
    this.id = this._oid
    return Promise.resolve(this)
  }
  
  update() {}
  
}
