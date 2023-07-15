import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blogform from './Blogform'

describe('<Blogform />', () => {

  // let blog
  let mockCreateHandler
  let container

  beforeEach(() => {
    mockCreateHandler = jest.fn()
    container = render(<Blogform createBlog={mockCreateHandler} />).container

  })

  test('renders content', () => {

    const blogformDiv = container.querySelector('.blogform-form')
    expect(blogformDiv).toHaveTextContent('Create New Blog')
    // const element = screen.getByText('Component testing is done with react-testing-library - Testy Test')
    // expect(element).toBeDefined()
  })

  test('handles input', async () => {
    const inputTitle = screen.getByPlaceholderText('title')
    const inputAuthor = screen.getByPlaceholderText('author')
    const inputUrl = screen.getByPlaceholderText('URL')
    const submitButton = container.querySelector('.blogform-submit')
    // const submitButton = screen.getByRole('button', { name: 'create' })

    const user = userEvent.setup()

    await user.type(inputTitle, 'Test Title')
    await user.type(inputAuthor, 'Test Author')
    await user.type(inputUrl, 'www.testurl.com')
    await user.click(submitButton)

    expect(mockCreateHandler.mock.calls).toHaveLength(1)
    expect(mockCreateHandler.mock.calls[0][0].title).toBe('Test Title')
    expect(mockCreateHandler.mock.calls[0][0].author).toBe('Test Author')
    expect(mockCreateHandler.mock.calls[0][0].url).toBe('www.testurl.com')
  })
})