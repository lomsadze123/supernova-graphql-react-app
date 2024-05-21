import { gql } from "@apollo/client";

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

// GraphQL subscription to get updates on the global sign-in count
const GLOBAL_SIGNIN_COUNT_SUBSCRIPTION = gql`
  subscription {
    globalSignInCount
  }
`;

export {
  GET_CURRENT_USER,
  GLOBAL_SIGNIN_COUNT_QUERY,
  GLOBAL_SIGNIN_COUNT_SUBSCRIPTION,
};
