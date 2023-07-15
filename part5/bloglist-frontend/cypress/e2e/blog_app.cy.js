describe('Note app', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000')
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Blab Blabby',
      username: 'newuser',
      password: 'bbbbbb'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
  })

  it('front page can be opened', function () {
    cy.contains('Blogs')
  })

  it('login form can be opened', function () {
    cy.get('#username').type('newuser')
    cy.get('#password').type('bbbbbb')
    cy.get('#login-button').click()

    cy.contains('Blab Blabby logged in')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('newuser')
      cy.get('#password').type('bbbbbb')
      cy.get('#login-button').click()
    })

    it('a new blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('.blogform-title').type('test blog')
      cy.get('.blogform-author').type('Testy Test')
      cy.get('.blogform-url').type('test.com')
      cy.contains('create').click()

      cy.contains('test blog - Testy Test')

    })
  })
})