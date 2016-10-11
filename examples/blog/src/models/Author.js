import Model from '../../../../Model'
import { getSingleAuthor } from '../api'

export default class Author extends Model {
  static fields = ['id', 'name']

  retrieve() {
    return getSingleAuthor(this.id)
  }
}
