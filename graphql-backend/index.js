const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const app = express();

// Sample student data
const students = [
  { id: 1, email: 'john.doe@example.com', firstName: 'John', lastName: 'Doe' },
  { id: 2, email: 'jane.smith@example.com', firstName: 'Jane', lastName: 'Smith' },
];

// Define the GraphQL schema
const typeDefs = gql`
  type Student {
    id: Int
    email: String
    firstName: String
    lastName: String
  }

  type Query {
    getStudents: [Student]
  }
`;

// Define the resolvers
const resolvers = {
  Query: {
    getStudents: () => students,
  },
};

// Create Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// Apply middleware
server.applyMiddleware({ app, path: '/graphql' });

// Start the server
app.listen({ port: 4000 }, () =>
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
);
