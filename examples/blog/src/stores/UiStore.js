import { observable } from 'mobx'
import Blog from '../models/Blog'
import Author from '../models/Author'

class UiStore {
  currentPost = observable(null)

  setCurrentPost = (post) => {
    post.load()
    post.author.load()
    this.currentPost.set(post)
  }

  setNewCurrentPost = () => {
    const post = new Blog()
    post.author = new Author()
    this.currentPost.set(post)
  }
  
}

const singleton = new UiStore()
export default singleton
