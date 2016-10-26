import { observable } from 'mobx'
import Blog from '../models/Blog'

class UiStore {
  currentPost = observable(null)

  constructor() {
    this.setCurrentPost = this.setCurrentPost.bind(this)
    this.setNewCurrentPost = this.setNewCurrentPost.bind(this)
  }

  setCurrentPost(post) {
    post.load()
    post.author.load()
    this.currentPost.set(post)
  }

  setNewCurrentPost() {
    const post = new Blog()
    this.currentPost.set(post)
  }
}

const singleton = new UiStore()
export default singleton
