import {
    ApolloClient,
    InMemoryCache
} from '@apollo/client';
import { createHttpLink } from "apollo-link-http";
import { setContext } from '@apollo/client/link/context';

const link = createHttpLink({ uri: process.env.SERVER_URI});
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

export const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache()
});