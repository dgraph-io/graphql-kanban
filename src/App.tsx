import React from 'react';
import './App.css';
import { User } from './types/graphql';
import { ApolloClient, InMemoryCache, HttpLink, ApolloProvider } from '@apollo/client';
import HomePage from './components/home';

// FIXME: built from JWT info?
const currentUser: User = {
  username: "Michael",
  isAdmin: true
}

const createApolloClient = () => 
  new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: process.env.REACT_APP_DGRAPH_BACKEND
    })
  })


const App = () => {
  const client = createApolloClient()
  return (
    <ApolloProvider client={client}>
      <HomePage user={currentUser}/>
    </ApolloProvider>
  )
}
export default App