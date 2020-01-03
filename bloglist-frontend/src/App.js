import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './App.css'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import { useField } from './hooks'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [blogVisible, setBlogVisible] = useState(false)

  const newBlogTitle = useField({ type: 'text', name: 'title' })
  const newBlogAuthor = useField({ type: 'text', name: 'author' })
  const newBlogUrl = useField({ type: 'text', name: 'blogURL' })

  const [errorMessage, setErrorMessage] = useState(null)
  const username = useField({ type: 'text', name: 'username' })
  const password = useField({ type: 'password', name: 'password' })
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        initialBlogs = initialBlogs.sort((a, b) => (!b.likes || a.likes > b.likes) ? -1 : 1)
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    console.log(loggedUserJSON)
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
        username: username.value,
        password: password.value,
      })

      blogService.setToken(user.token)
      setUser(user)
      username.reset()
      password.reset()

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
      const blog = await blogService
        .create({
          title: newBlogTitle.value,
          author: newBlogAuthor.value,
          url: newBlogUrl.value
        })
      blogService.setToken(user.token)
      newBlogAuthor.reset()
      newBlogTitle.reset()
      newBlogUrl.reset()
      setBlogs(blogs.concat(blog))

      setErrorMessage(`${newBlogTitle.value} by ${newBlogAuthor.value} added`)
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

  const refreshBlogs = () => {
    setBlogs(blogs.sort((a, b) => (!b.likes || a.likes > b.likes) ? -1 : 1))
  }

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
    // eslint-disable-next-line no-unused-vars
    let reset, name, pass

    ({ reset, ...name } = username);
    ({ reset, ...pass } = password)
    return(
      <div>
        <LoginForm
          username={name}
          password={pass}
          handleSubmit={handleLogin}
        />
      </div>
    )
  }

  LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    username: PropTypes.object.isRequired,
    password: PropTypes.object.isRequired
  }

  const blogForm = () => {
    const hideWhenVisible = { display: blogVisible ? 'none' : '' }
    const showWhenVisible = { display: blogVisible ? '' : 'none' }

    // eslint-disable-next-line no-unused-vars
    let reset, title, author, url

    ({ reset, ...title } = newBlogTitle);
    ({ reset, ...author } = newBlogAuthor);
    ({ reset, ...url } = newBlogUrl)

    return(
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setBlogVisible(true)}>create</button>
        </div>
        <div style={showWhenVisible}>
          {user ?
            <BlogForm
              newBlogAuthor={author}
              newBlogTitle={title}
              newBlogUrl={url}
              handleBlogCreation={handleBlogCreation}
            />
            : null
          }
          <button onClick={() => setBlogVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  BlogForm.propTypes = {
    newBlogAuthor: PropTypes.object.isRequired,
    newBlogTitle: PropTypes.object.isRequired,
    newBlogUrl: PropTypes.object.isRequired,
    handleBlogCreation: PropTypes.func.isRequired
  }

  if (user){
    console.log('user is logged in')
  }

  return (
    <div>
      <Notification message={errorMessage} />
      <h2>blogs</h2>
      {user
        ?<div className="info">
          <p>{user.name} logged in</p>
          <button onClick={ logoutUser }>log out</button>
          <h2>create new</h2>
          {blogForm()}
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} user={user} refreshBlogs={refreshBlogs}/>
          )}
        </div>
        : loginForm()}
    </div>
  )
}

export default App
