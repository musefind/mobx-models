import Model from '../../../../Model'
import AuthorStore from '../stores/AuthorStore'
import { getSinglePost } from '../api'

export default class Blog extends Model {
  static fields = ['id', 'title', 'content']
  static nestedStores = {
    author: AuthorStore,
  }
 
  static process(data) {
    if (data.author_id) {
      data.author = {id: data.author_id, name: null}
      delete data.author_id
    }
    return data
  }
  
  retrieve() {
    return getSinglePost(this.id)
  }
}
