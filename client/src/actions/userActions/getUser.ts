import { gql } from "@apollo/client";

const GET_USERS = gql`
  query {
    users {
      id
      email
    }
  }
`;

const GET_CURRENT_USER = gql`
  query {
    currentUser {
      id
      email
      signInCount
    }
  }
`;

const GLOBAL_SIGNIN_COUNT_QUERY = gql`
  query globalSignInCount {
    globalSignInCount
  }
`;

const GLOBAL_SIGNIN_COUNT_SUBSCRIPTION = gql`
  subscription {
    globalSignInCount
  }
`;

export {
  GET_USERS,
  GET_CURRENT_USER,
  GLOBAL_SIGNIN_COUNT_QUERY,
  GLOBAL_SIGNIN_COUNT_SUBSCRIPTION,
};
