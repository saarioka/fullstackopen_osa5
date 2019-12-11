import React, {useState} from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user, refreshBlogs}) => {
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

  const isUser = () => {
    return user && user.username === blog.user.username
  }

  const removeButtonStyle = {
    display: isUser() ? '' : 'none'
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
    refreshBlogs()
    console.log("tykkää ja jaa")
  }

  const handleRemove = (blog) => {

    if (window.confirm(`remove blog ${blog.name} by ${blog.author}?`)) {
      blogService.remove(blog.id, user.token)
    }
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
        <button type="button" style={removeButtonStyle} onClick={() => handleRemove(blog)}>remove</button>
      </div>
    </div>
  )}

export default Blog