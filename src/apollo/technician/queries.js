import { gql } from "apollo-boost";

export const LIST_ALL_TECHNICIANS = gql`
  query {
    technicians {
      firstname
      lastname
      id
      created_at
      status
    }
  }
`;
