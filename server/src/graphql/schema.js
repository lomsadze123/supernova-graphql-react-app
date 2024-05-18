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

  input CreateUserInput {
    username: String!
    email: String!
    password: String!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
  }
`;

export default typeDefs;
