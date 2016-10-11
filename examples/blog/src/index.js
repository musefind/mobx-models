import React from 'react'
import ReactDOM from 'react-dom'
import { observer } from 'mobx-react'
import BlogStore from './stores/BlogStore'
import UiStore from './stores/UiStore'

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
