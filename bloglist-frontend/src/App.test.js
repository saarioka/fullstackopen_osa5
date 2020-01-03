import React from 'react'
import {
  render, waitForElement
} from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'
/*
describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('login')
    )

    const blogs = component.container.querySelectorAll('.info')
    expect(blogs.length).toBe(0)
  })

  test('if user is logged, blogs are rendered', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }

    localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

    const component = render(
      <App />
    )
    component.rerender(<App />)

    console.log(localStorage.getItem('loggedBlogappUser'))

    await waitForElement(
      () => component.container.querySelector('.info')
    )

    const blogs = component.container.querySelectorAll('.info')
    console.log(blogs)
    expect(blogs.length).toBe(6)
  })
})
*/