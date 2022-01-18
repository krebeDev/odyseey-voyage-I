const { ApolloServer } = require('apollo-server');
const { readFileSync } = require('fs');
const { parse } = require('graphql');

const typeDefs = readFileSync('./reviews.graphql').toString();
const resolvers = require('./resolvers');
const ReviewsAPI = require('./datasources/ReviewsApi');

const server = new ApolloServer({
  typeDefs: parse(typeDefs),
  resolvers,
  dataSources: () => {
    return {
      reviewsAPI: new ReviewsAPI(),
    };
  },
});

const port = 4002;

server.listen({ port }).then(({ url }) => {
  console.log(`🚀 Server running at ${url}`);
});
