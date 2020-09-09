import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider , withApollo, ApolloClient, InMemoryCache} from '@apollo/client';
import { createHttpLink } from "apollo-link-http";
import { setContext } from '@apollo/client/link/context';

const link = createHttpLink({ uri: process.env.SERVER_URI});

// const client = new ApolloClient({
//   link,
//   cache: new InMemoryCache()
// });
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them\
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache()
});

 // const AppWithApollo = withApollo(App);

ReactDOM.render(
  <React.StrictMode>
   <ApolloProvider client={client}>
    <App />
   </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();