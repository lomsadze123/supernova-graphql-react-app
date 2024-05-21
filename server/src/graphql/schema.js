import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    signInCount: Int!
    token: String
  }

  type Query {
    currentUser: User
    globalSignInCount: Int!
  }

  type Mutation {
    createUser(input: UserCredentialsInput!): User
    loginUser(input: UserCredentialsInput!): User
  }

  input UserCredentialsInput {
    email: String!
    password: String!
  }

  type Subscription {
    globalSignInCount: Int!
  }
`;

export default typeDefs;
