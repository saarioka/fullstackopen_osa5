import React from 'react'

const BlogForm = ({
  handleBlogCreation,
  newBlogAuthor,
  newBlogTitle,
  newBlogUrl
}) => {
  return (
    <form onSubmit={handleBlogCreation}>
      <div>
        title:
        <input {... newBlogTitle} />
      </div>
      <div>
        author:
        <input {... newBlogAuthor} />
      </div>
      <div>
        url:
        <input {... newBlogUrl} />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm