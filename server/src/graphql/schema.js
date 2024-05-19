import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    token: String
  }

  type Query {
    users: [User]
    currentUser: User
  }

  type Mutation {
    createUser(input: UserCredentialsInput!): User
    loginUser(input: UserCredentialsInput!): User
  }

  input UserCredentialsInput {
    email: String!
    password: String!
  }
`;

export default typeDefs;
