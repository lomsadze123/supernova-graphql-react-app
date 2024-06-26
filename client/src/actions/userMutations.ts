import { gql } from "@apollo/client";

// GraphQL mutation to create a new user
const CREATE_USER = gql`
  mutation CreateUser($input: UserCredentialsInput!) {
    createUser(input: $input) {
      token
    }
  }
`;

const LOGIN_USER = gql`
  mutation LoginUser($input: UserCredentialsInput!) {
    loginUser(input: $input) {
      token
    }
  }
`;

export { CREATE_USER, LOGIN_USER };
