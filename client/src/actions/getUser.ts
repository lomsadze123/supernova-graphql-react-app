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

export default GET_USERS;
