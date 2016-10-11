import { observable } from 'mobx'
import BlogStore from './BlogStore'

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
    const post = BlogStore.findOrInitialize({title: 'New Post', content: ''})
    this.currentPost.set(post)
  }
}

const singleton = new UiStore()
export default singleton
