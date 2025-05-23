const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const initDb = require('./initDatabase');

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await initDb();
    const server = new ApolloServer({ typeDefs, resolvers });
    const { url } = await server.listen(PORT);
    console.log(`Distributed systems GraphQL server: ${url}`);
  } catch (error) {
    console.error('Failed to start server:', error);
  }
}

start();
