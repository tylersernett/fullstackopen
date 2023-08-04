//hours spent: 1.5 + 2

const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')
const { v1: uuid } = require('uuid')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/author')
const Book = require('./models/book')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

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

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(name: String!, setBornTo: Int!): Author
  }
`

const resolvers = {
  Query: {
    bookCount: async () => {
      return await Book.countDocuments();
    },
    authorCount: async () => {
      return await Author.countDocuments();
    },
    allBooks: async (_, { author, genre }) => {
      const filters = {};
      if (author) {
        const authorObj = await Author.findOne({ name: author });
        if (authorObj) {
          filters.author = authorObj._id;
        } else {
          return [];
        }
      }
      if (genre) {
        filters.genres = genre;
      }
      return await Book.find(filters).populate('author');
    },
    allAuthors: async () => {
      const authors = await Author.find({});
      const books = await Book.find({});
      return authors.map(author => ({
        ...author._doc,
        bookCount: books.filter(book => book.author.equals(author._id)).length,
      }));
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      try {
        let existingAuthor = await Author.findOne({ name: args.author })
        if (!existingAuthor) {
          const newAuthor = new Author({
            name: args.author,
            born: null,
          });
          existingAuthor = await newAuthor.save()
        }

        const newBook = new Book({
          ...args,
          author: existingAuthor._id, // Use the ObjectId of the existingAuthor, NOT THE NAME
        });

        await newBook.save()
        return newBook;
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        });
      }
    },
    editAuthor: async (root, { name, setBornTo }) => {
      try {
        const updatedAuthor = await Author.findOneAndUpdate(
          { name: name },
          { $set: { born: setBornTo } },
          { new: true } // Return the updated document
        );

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
}).then(({ url }) => {
  console.log(`Apollo server ready at ${url}`)
})