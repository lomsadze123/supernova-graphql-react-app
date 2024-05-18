import { gql } from "@apollo/client";

const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      username
      email
    }
  }
`;

export default CREATE_USER;
