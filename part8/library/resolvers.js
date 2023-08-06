const { GraphQLError } = require('graphql')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
require('dotenv').config()
const JWT_SECRET = process.env.SECRET

const resolvers = {
  Query: {
    bookCount: async () => {
      return await Book.countDocuments()
    },
    authorCount: async () => {
      return await Author.countDocuments()
    },
    allBooks: async (_, { author, genre }) => {
      const filters = {}
      if (author) {
        const authorObj = await Author.findOne({ name: author })
        if (authorObj) {
          filters.author = authorObj._id
        } else {
          return []
        }
      }
      if (genre) {
        filters.genres = genre
      }
      return await Book.find(filters).populate('author')
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      const books = await Book.find({})
      return authors.map(author => ({
        ...author._doc,
        bookCount: books.filter(book => book.author.equals(author._id)).length,
      }))
    },
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Mutation: {
    createUser: async (root, args) => {
      const { username, favoriteGenre } = args

      const passwordHash = await bcrypt.hash('password', 10)

      const user = new User({
        username,
        favoriteGenre,
        passwordHash,
      })

      try {
        await user.save()
        return user
      } catch (error) {
        throw new GraphQLError('Creating user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: username,
            error,
          },
        })
      }
    },

    login: async (root, args) => {
      const { username, password } = args

      const user = await User.findOne({ username })
      const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)

      if (!(user && passwordCorrect)) {
        throw new GraphQLError('Invalid username or password')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      const token = jwt.sign(userForToken, JWT_SECRET)

      return { value: token }
    },
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('Authentication required for this operation')
      }
      try {
        let existingAuthor = await Author.findOne({ name: args.author })
        if (!existingAuthor) {
          const newAuthor = new Author({
            name: args.author,
            born: null,
          })
          existingAuthor = await newAuthor.save()
        }

        const newBook = new Book({
          ...args,
          author: existingAuthor // Use the entire author object
        })

        await newBook.save()
        pubsub.publish('BOOK_ADDED', { bookAdded: newBook })
        return newBook
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        })
      }
    },
    editAuthor: async (root, { name, setBornTo }, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('Authentication required for this operation')
      }
      try {
        const updatedAuthor = await Author.findOneAndUpdate(
          { name: name },
          { $set: { born: setBornTo } },
          { new: true } // Return the updated document
        )

        if (!updatedAuthor) {
          return null
        }

        console.log(updatedAuthor)
        return updatedAuthor

      } catch (error) {
        throw new GraphQLError('Editing author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: name,
            error
          }
        })
      }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    }
  }
}

module.exports = resolvers