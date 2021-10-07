const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const cors = require('cors')

// database
const schema = require('./schema')
const Root = require('./root')
const Service = require('../service/Service.js')
const resolver = new Root(new Service()).init()

// Create an express server and a GraphQL endpoint
const app = express()
const corsOpts = {
  origin: '*'
}

app.use(cors(corsOpts))
app.use('/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true
  })
)

app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'))
