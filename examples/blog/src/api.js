const delay = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data)
    }, 100)
  })
}

export const getSinglePost = (id) => delay({
  content: 'blog post with id ' + id,
  id: id,
  title: 'post ' + id,
  author: {
    id: id + 20,
    name: 'author ' + (id + 20)
  }
})

export const getAllPosts = () => {
  console.log('get all posts!')
  const data = []
  for (let i = 1; i < 10; i++) {
    data.push({
      id: i,
      title: 'post ' + i,
      author_id: i + 20,
      content: 'blog post with id ' + i,
    })
  }
  return delay(data)
}

export const getAllAuthors = () => {
  const data = []
  for (let i = 1; i < 10; i++) {
    data.push({
      id: i + 20,
      name: 'author ' + (i + 20),
    })
  }
  return delay(data)
}

export const getSingleAuthor = (id) => delay({
  name: 'author ' + id,
  id: id,
})
