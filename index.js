const mongoose = require('mongoose');
const { GraphQLServer } = require('graphql-yoga');

// routers
const typeDefs = './schema.graphql';
const Query = require('./resolvers/query');
const Mutation = require('./resolvers/mutation');
const Person = require('./resolvers/Person');

// app = express()
// app.use(...)
const server = new GraphQLServer({
  typeDefs,
  resolvers: { Query, Mutation, Person }
});

// app.listen(...)
mongoose.connect('mongodb://localhost:27017/graphql-vip');
server.start(() => console.log('Server is running'));