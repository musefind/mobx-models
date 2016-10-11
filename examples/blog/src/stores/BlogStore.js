import Store from '../../../../Store'
import Collection from '../../../../Collection'
import Blog from '../models/Blog'
import { getAllPosts } from '../api'

const BlogStore = new Store(Blog)

BlogStore.all = new Collection(BlogStore, {
  takeAll: true,
  loader: () => getAllPosts(),
})

export default BlogStore
