import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import { onError } from "apollo-link-error";

import { resolvers, CURRENT_USER } from "./localManagement";

onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

function createApolloClient() {
  /**
   * Link Apollo client with the remote GraphQL server
   * (In our case, we are using a proxy)
   */
  const httpLink = createHttpLink({
    uri: `https://360.awaks.fr/graphql`
  });

  /**
   * Set the cache persistence on the localStorage
   */
  const cache = new InMemoryCache();
  persistCache({
    cache,
    storage: window.localStorage,
    debug: process.env.NODE_ENV === "development"
  });

  const authLink = setContext((_, { headers }) => {
    /**
     * Querying the cache to get the user token
     */
    const { auth } = cache.readQuery({ query: CURRENT_USER });
    const { token } = auth;

    /**
     * Set the token to the context so httpLink can read it
     * */
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : ""
      }
    };
  });

  /**
   * Create the Apollo client and return it
   */

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
    resolvers,
    defaultOptions: {
      query: {
        fetchPolicy: "cache-and-network"
      },
      watchQuery: {
        fetchPolicy: "cache-and-network",
        errorPolicy: "ignore"
      }
    }
  });

  return client;
}

export default createApolloClient;
