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

  input LoginUserInput {
    email: String!
    password: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    loginUser(input: LoginUserInput!): AuthPayload!
  }
`;

export default typeDefs;
