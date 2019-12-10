import React from 'react'

const BlogForm = ({
  handleBlogCreation,
  newBlogAuthor,
  newBlogTitle,
  newBlogUrl,
  handleNewBlogAuthorChange,
  handleNewBlogTitleChange,
  handleNewBlogUrlChange
}) => {
  return (
    <form onSubmit={handleBlogCreation}>
      <div>
        title:
        <input
          type="text"
          value={newBlogTitle}
          onChange={handleNewBlogAuthorChange}
        />
      </div>
      <div>
        author:
        <input
          type="text"
          value={newBlogAuthor}
          onChange={handleNewBlogTitleChange}
        />
      </div>
      <div>
        url:
        <input
          type="text"
          value={newBlogUrl}
          onChange={handleNewBlogUrlChange}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm