import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';

const httpEndpoint = createHttpLink({
  uri: 'http://localhost:4000'
});

const authEndpoint = setContext((graphQLRequest, previousContext) => {
  const token = localStorage.getItem('AUTH_TOKEN');
  return {
    headers: {
      ...previousContext.headers,
      Authorization: token ? `Bearer ${token}` : ''
    }
  }
});

const client = new ApolloClient({
  link: authEndpoint.concat(httpEndpoint),
  cache: new InMemoryCache()
})

ReactDOM.render(<ApolloProvider client={client}>
    <App />
  </ApolloProvider>, document.getElementById('root'));
registerServiceWorker();
