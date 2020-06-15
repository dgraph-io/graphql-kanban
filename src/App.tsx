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
      uri: "http://localhost:8180/graphql"
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