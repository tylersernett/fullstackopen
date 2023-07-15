describe('Blog app', function () {
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

  it('Login form is shown', function () {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {

      cy.get('#username').type('newuser')
      cy.get('#password').type('bbbbbb')
      cy.get('#login-button').click()

      cy.contains('Blab Blabby logged in')
    })

    it('fails with wrong credentials', function () {
      // ...
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('newuser')
      cy.get('#password').type('bbbbbb')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('.blogform-title').type('test blog')
      cy.get('.blogform-author').type('Testy Test')
      cy.get('.blogform-url').type('test.com')
      cy.contains('create').click()

      cy.contains('test blog - Testy Test')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.contains('new blog').click()
        cy.get('.blogform-title').type('test blog')
        cy.get('.blogform-author').type('Testy Test')
        cy.get('.blogform-url').type('test.com')
        cy.contains('create').click()
      })

      it('its likes can be increased', function () {
        cy.contains('test blog - Testy Test')
          .contains('view')
          .click()

        cy.contains('test blog - Testy Test')
          .contains('likes: 0')

        cy.contains('test blog - Testy Test')
          .contains('like')
          .click()

        cy.contains('test blog - Testy Test')
          .contains('likes: 1')
      })

    })
  })

})