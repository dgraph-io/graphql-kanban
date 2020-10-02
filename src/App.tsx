import React from "react"
import "./App.css"
import { User } from "./types/graphql"
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloProvider,
} from "@apollo/client"
import { KanbanBoard, Header, Projects } from "./components"
import { BrowserRouter, Switch, Route } from "react-router-dom"

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
    <BrowserRouter>
      <ApolloProvider client={client}>
        <div style={{ height: "-webkit-fill-available", paddingTop: "10em" }}>
          <Header user={currentUser} />
          <Switch>
            <Route exact path="/project/:projID" component={KanbanBoard} />
            <Route
              exact
              path="/"
              render={(props) => <Projects {...props} withProjectEdits={currentUser.isAdmin === true}/>}
            />
          </Switch>
        </div>
      </ApolloProvider>
    </BrowserRouter>
  )
}
export default App
