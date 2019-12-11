import React, {useState} from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [infoVisible, setInfoVisible] = useState(false)

  const mainStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const infoStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    display: infoVisible ? '' : 'none'
  }

  const toggleVisible = () => {
    setInfoVisible(!infoVisible)
  }

  const handleLike = (blog) => {
    blogService.update(
      blog.id,
      {
        user: blog.user.id,
        likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url
      }
    )
  }

  return(
    <div>
      <div style={mainStyle} onClick={toggleVisible}>
        {blog.title} {blog.author}
      </div>
      <div style={infoStyle}>
        {blog.url} <br/>
        {blog.likes} likes <button type="button" onClick={() => handleLike(blog)}>like</button> <br/>
        added by {blog.user.name}
      </div>
    </div>
  )}

export default Blog