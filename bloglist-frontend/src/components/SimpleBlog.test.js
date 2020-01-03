import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Albert Einstein',
    likes: '123'
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
  expect(component.container).toHaveTextContent(
    'Albert Einstein'
  )
  expect(component.container).toHaveTextContent(
    '123'
  )
})

test('clicking the button calls event handler twice', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Albert Einstein',
    likes: '123'
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})