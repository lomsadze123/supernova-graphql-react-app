import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Query {
    users: [User]
  }

  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User!
  }
`;

export default typeDefs;
