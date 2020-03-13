import { gql } from "apollo-boost";

export const CURRENT_LOGGED_USER = gql`
  query {
    auth @client {
      token
      loggedAs {
        id
        name
        phone
        siret
        address {
          line1
          postal_code
          city
        }
      }
      userCompanies {
        id
        name
        siret
      }
    }
  }
`;

export const LIST_ALL_USERS = gql`
  query {
    users {
      firstname
      lastname
      id
      email
      status
      role
      company_id
      companies {
        id
        name
      }
    }
  }
`;
export const PERSONNAL_INFORMATIONS = gql`
  query {
    me {
      firstname
      lastname
      id
      email
      companies {
        address {
          line1
        }
      }
    }
  }
`;
