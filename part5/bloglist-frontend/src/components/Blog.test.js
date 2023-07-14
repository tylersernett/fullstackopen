import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog> />', () => {

  let blog
  let mockLikeHandler
  let container

  beforeEach(() => {
    blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Testy Test',
      url: 'test.com',
      likes: 42,
      user: { id: 101, name: 'Fake Name' }
    }
    mockLikeHandler = jest.fn()
    container = render(<Blog blog={blog} handleLike={mockLikeHandler} loggedInUser={{ username: 'fakename' }} />).container

  })

  test('renders content', () => {

    const blogDiv = container.querySelector('.blog')
    expect(blogDiv).toHaveTextContent('Component testing is done with react-testing-library - Testy Test')
    // const element = screen.getByText('Component testing is done with react-testing-library - Testy Test')
    // expect(element).toBeDefined()
  })

  test('clicking like button twice calls event handler twice', async () => {

    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)
    const likeButton = container.querySelector('.like-button')
    await user.click(likeButton)
    await user.click(likeButton)

    console.log(blog)

    expect(mockLikeHandler.mock.calls).toHaveLength(2)
  })

  test('initially, children are not displayed', () => {

    const div = container.querySelector('.blog-details')
    expect(div).toBeNull()
  })

  test('after clicking the view button, children are displayed', async () => {

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.blog-details')
    expect(div).toBeDefined()
  })

})