import React from "react"
import "./App.css"
import { User } from "./types/graphql"
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloProvider,
} from "@apollo/client"
import { Home } from "./components"

// FIXME: built from JWT info?
const currentUser: User = {
  username: "Michael",
  isAdmin: true,
}

const createApolloClient = () =>
  new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: process.env.REACT_APP_DGRAPH_BACKEND,
    }),
  })

const App = () => {
  const client = createApolloClient()
  return (
    <ApolloProvider client={client}>
      <Home user={currentUser} />
    </ApolloProvider>
  )
}
export default App
