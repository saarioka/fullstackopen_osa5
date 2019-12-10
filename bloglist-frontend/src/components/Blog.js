import React, {useState} from 'react'
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

  return(
    <div>
      <div style={mainStyle} onClick={toggleVisible}>
        {blog.title} {blog.author}
      </div>
      <div style={infoStyle}>
        {blog.url} <br/>
        {blog.likes} likes <button type="button" onClick={() => console.log('*Tycks*')}>like</button> <br/>
        added by {blog.author}
      </div>
    </div>
  )}

export default Blog