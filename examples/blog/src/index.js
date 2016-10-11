import React from 'react'
import ReactDOM from 'react-dom'
import MobXModel from '../../../index'
import { getAllPosts, getSingleAuthor, getSinglePost } from './api'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

class Author extends MobXModel.Model {
  static fields = ['id', 'name']
  
  retrieve() {
    return getSingleAuthor(this.id)
  }
}

const AuthorStore = new MobXModel.Store(Author)

class Blog extends MobXModel.Model {
  static fields = ['id', 'title', 'content']
  static nestedStores = {
    author: AuthorStore,
  }
  static processor = (data) => {
    data.author = {id: data.author_id, name: null}
    delete data.author_id
    return data
  }
  
  retrieve() {
    return getSinglePost(this.id)
  }
}

const BlogStore = new MobXModel.Store(Blog)

BlogStore.all = new MobXModel.Collection(BlogStore, {takeAll: true}, () => {
  return getAllPosts()
})

const UiStore = (new class {
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

}())

const Post = observer(({ blog, setCurrentPost }) =>
  <article onClick={() => { setCurrentPost(blog) }}>
    <h6>{blog.title}</h6>
    <p>{blog.content}</p>
  </article>
)

const PostList = observer(({ blogs, setCurrentPost }) =>
  <div>
    {blogs.map((blog) => <Post key={blog._oid} blog={blog} setCurrentPost={setCurrentPost} />)}
  </div>
)

const EditPost = observer(({ blog, newPost }) => {
  const post = blog.get()
  if (!post) {
    return <div>
      <hr />
      <button onClick={newPost}>New Post</button>
      <br />
      No Selection.
    </div>
  }

  return (
    <div>
      <button onClick={newPost}>New Post</button>
      <hr />
      <input value={post.title} type="text" name="Title" onChange={(e) => { post.title = e.target.value }} />
      <br />
      <textarea name="Content" value={post.content || ''} onChange={(e) => { post.content = e.target.value }} />
      <p>Author: {post.author.name}</p>
    </div>
  )
})

const App = () => (
  <div>
    <PostList blogs={BlogStore.all} setCurrentPost={UiStore.setCurrentPost} />
    <EditPost blog={UiStore.currentPost} newPost={UiStore.setNewCurrentPost} />
  </div>
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
