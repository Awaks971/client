import { gql } from "apollo-boost";

/**
 * Here we have our local state manager
 */

export const CURRENT_USER = gql`
  query {
    auth @client {
      userId
      token
      firstname
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
      role
      userCompanies {
        id
        name
      }
    }
  }
`;
export const NAMESPACE = "auth";

/**
 * Here we have the default authentication object
 */

export const DEFAULTS = {
  [NAMESPACE]: {
    __typename: "User",
    userId: null,
    token: null,
    role: null,
    firstname: null,
    lastname: null,

    loggedAs: {
      __typename: "Company",
      name: null,
      id: null,
      phone: null,
      siret: null,
      address: {
        __typename: "CompanyAddress",
        line1: null,
        postal_code: null,
        city: null
      }
    },

    userCompanies: {
      __typename: "Company",
      name: null,
      id: null
    }
  }
};

export function resetCache(cache) {
  cache.reset();
  cache.writeQuery({
    query: CURRENT_USER,
    data: DEFAULTS
  });
}

/**
 * Here we have our local resolvers
 * login: Write the authentication object in cache
 * logout: Reset all the cache
 */

export const resolvers = {
  Mutation: {
    login(obj, { input }, { cache }, info) {
      cache.writeQuery({
        query: CURRENT_USER,
        data: { auth: input }
      });
      return {};
    },
    logout(obj, args, { cache }, info) {
      resetCache(cache);
      return {};
    }
  }
};
