//hours spent: 1.5 + 2 + 2.5 + 2 + 1 + 2 

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
const typeDefs = require('./schema')
const resolvers = require('./resolvers')

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