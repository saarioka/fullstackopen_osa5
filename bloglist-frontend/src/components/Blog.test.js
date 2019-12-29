import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Blog from './Blog'

afterEach(cleanup)

test('oletusarvoisesti blogista on näkyvissä ainoastaan nimi ja kirjoittaja', () => {
  const blog = {
    user: {
      "username": "knimi",
      "name": "nimi"
    },
    title: 'Component testing is done with react-testing-library',
    author: 'Albert Einstein',
    likes: '123',
    url: 'urli'
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
  expect(component.container).toHaveTextContent(
    'Albert Einstein'
  )
  expect(component.container).not.toHaveTextContent(
    '1234'
  )
})

 describe('oletusarvoisesti blogista on näkyvissä ainoastaan nimi ja kirjoittaja', () => {
  let component

  const blog = {
    user: {
      "username": "knimi",
      "name": "nimi"
    },
    title: 'Component testing is done with react-testing-library',
    author: 'Albert Einstein',
    likes: '123',
    url: 'urli'
  }

  beforeEach(() => {
    component = render(
      <Blog blog={blog} />
    )
  })

  test('renders its children', () => {
    component.container.querySelector('.testDiv')
  })

  test('at start the children are not displayed', () => {
    const div = component.container.querySelector('.togglableContent')

    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', () => {
    const cickable_div = component.container.querySelector('.info')
    fireEvent.click(cickable_div)

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

})
