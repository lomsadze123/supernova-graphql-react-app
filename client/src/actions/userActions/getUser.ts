import { gql } from "@apollo/client";

const GET_USERS = gql`
  query {
    users {
      id
      username
      email
    }
  }
`;

const GET_CURRENT_USER = gql`
  query {
    currentUser {
      id
      username
      email
    }
  }
`;

export { GET_USERS, GET_CURRENT_USER };
