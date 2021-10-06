import React, { Component } from 'react';
import Main from "./Main";
import {
  BrowserRouter as Router,
} from "react-router-dom";
import {ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from} from "@apollo/client";
import {onError} from "@apollo/client/link/error";
import store from "./store";
import { Provider } from 'react-redux';

const errorLink = onError(({graphqlErrors, networkError}) => {
  if(graphqlErrors) {
    graphqlErrors.map(({message, location, path}) => {
     return console.log(`GraphQL error : ${message}`)
    })
  }
})
const link = from([
  errorLink,
  new HttpLink({uri: "http://localhost:4000/"})
])

export const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
})


export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <ApolloProvider client={client}>
            <Main />
          </ApolloProvider>
        </Router>
      </Provider>
    )
  }
}
