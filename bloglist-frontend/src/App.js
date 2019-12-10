import React, { useState, useEffect } from 'react'
import './App.css'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [blogVisible, setBlogVisible] = useState(false)

  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService
      .getAll().then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleBlogCreation = async (event) => {
    event.preventDefault()
    try {
      const blog = await blogService.create({
        title: newBlogTitle,
        author: newBlogAuthor,
        url: newBlogUrl
      })

      blogService.setToken(user.token)
      setNewBlogAuthor('')
      setNewBlogTitle('')
      setNewBlogUrl('')

      blogs.concat(blog)

      setErrorMessage(`${newBlogTitle} by ${newBlogAuthor} added`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

    } catch (exception) {
      setErrorMessage('something went wrong')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const logoutUser = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

/*
  const blogForm = () => (
    <form onSubmit={addBlog}>
      <input
        value={newBlog}
        onChange={handleBlogChange}
      />
      <button type="submit">save</button>
    </form>
  )
*/
  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }

    return (
      <div className="error">
        <h1>{message}</h1>
      </div>
    )
  }

  const loginForm = () => {
    return(
      <div>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </div>
    )
  }

  const blogForm = () => {
    const hideWhenVisible = { display: blogVisible ? 'none' : '' }
    const showWhenVisible = { display: blogVisible ? '' : 'none' }

    return(
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setBlogVisible(true)}>create</button>
        </div>
        <div style={showWhenVisible}>
          {user ?
            <BlogForm
              newBlogAuthor={newBlogAuthor}
              newBlogTitle={newBlogTitle}
              newBlogUrl={newBlogUrl}
              handleNewBlogAuthorChange={({ target }) => setNewBlogAuthor(target.value)}
              handleNewBlogTitleChange={({ target }) => setNewBlogTitle(target.value)}
              handleNewBlogUrlChange={({ target }) => setNewBlogUrl(target.value)}
              handleBlogCreation={handleBlogCreation}
            />
            : loginForm()
          }
          <button onClick={() => setBlogVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Notification message={errorMessage} />
      <h2>blogs</h2>
      { user ?
        <div>
          <p>{user.name} logged in</p>
          <button onClick={ logoutUser }>log out</button>
        </div>
        : null}
      <h2>create new</h2>
      {blogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
