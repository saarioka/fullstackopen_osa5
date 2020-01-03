import React from 'react'
import { 
  render, waitForElement 
} from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('login')
    )

    const blogs = component.container.querySelectorAll('.blogs')
    expect(blogs.length).toBe(0)
  })
})

describe('<App />', () => {
  test('if user is logged, blogs are rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('login')
    )

    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }

    localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

    let savedItems = {}

    const localStorageMock = {
      setItem: (key, item) => {
        savedItems[key] = item
      },
      getItem: (key) => savedItems[key],
      clear: savedItems = {}
    }
    
    Object.defineProperty(window, 'localStorage', { value: localStorageMock })
    
    console.log(localStorage.getItem('loggedBlogappUser'))

    const blogs = component.container.querySelectorAll('.info')
    
    console.log(blogs)
    //expect(blogs.length).toBe(6) 
  })

  
})