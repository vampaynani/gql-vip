const mongoose = require('mongoose');
const { GraphQLServer } = require('graphql-yoga');
const DBUser = require('./models/user');
const jwt = require('jsonwebtoken');

// routers
const typeDefs = './schema.graphql';
const Query = require('./resolvers/query');
const Mutation = require('./resolvers/mutation');
const Person = require('./resolvers/Person');

// app = express()
// app.use(...)
const server = new GraphQLServer({
  typeDefs,
  resolvers: { Query, Mutation, Person },
  context: incomingRequest => ({
    validateUser: async () => {
      const AuthHeader = incomingRequest.request.header('authorization');
      if(!AuthHeader){
        throw "Unauthorized";
      }
      const token = AuthHeader.replace('Bearer ', '');
      const decodedToken = jwt.verify(token, 'secretpassphrase');
      const isUser = await DBUser.findById(decodedToken.user._id);
      if(!isUser){
        throw "Unauthorized";
      }
    }
  })
});

// app.listen(...)
mongoose.connect('mongodb://localhost:27017/graphql-vip');
server.start(() => console.log('Server is running'));