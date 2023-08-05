//hours spent: 1.5 + 2 + 2.5

const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')
const { v1: uuid } = require('uuid')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.SECRET

console.log('connecting to mongoDB')

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

// const testAuthor = new Author({
//   name: 'Testy Test',
// })

// testAuthor.save().then(result => {
//   console.log('author saved!')
//   mongoose.connection.close()
// })

const typeDefs = `
  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(name: String!, setBornTo: Int!): Author

    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`

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
          author: existingAuthor._id, // Use the ObjectId of the existingAuthor, NOT THE NAME
        });

        await newBook.save()
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
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id) 
      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(` Apollo server ready at ${url}`)
})