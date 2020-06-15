import fetch from "cross-fetch";
import { ApolloClient, InMemoryCache, HttpLink, gql } from "@apollo/client";
import { AddProjectInput, AddUserInput } from "../types/graphql";
import {
  AddProjectsDocument,
  AddProjectsMutation,
  AddProjectsMutationVariables,
  AddUsersDocument,
  AddUsersMutation,
  AddUsersMutationVariables,
} from "./types/operations";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "http://localhost:8180/graphql",
    fetch: fetch,
  }),
});

const users: Array<AddUserInput> = [
  { username: "MichaelJCompton", displayName: "Michael", isAdmin: true },
  { username: "vardhanapoorv", displayName: "Apoorv", isAdmin: true },
  { username: "jarifibrahim", displayName: "Ibrahim" },
  { username: "gja", displayName: "Tejas" },
  { username: "shekarm", displayName: "Shekar" },
];

const projects: Array<AddProjectInput> = [
  {
    name: "Dgraph",
    description: "Fast, Distributed Graph DB",
    url: "https://github.com/dgraph-io/dgraph",
    admin: { username: "shekarm" }
  },
  {
    name: "GraphQL",
    description: "Native GraphQL in Dgraph",
    url: "https://github.com/dgraph-io/dgraph",
    admin: { username: "MichaelJCompton" }
  },
  {
    name: "Badger",
    description: "Fast key-value DB in Go",
    url: "https://github.com/dgraph-io/dgraph",
    admin: { username: "jarifibrahim" }
  },
  {
    name: "GraphQL Kanban",
    description: "Project management app written with Dgraph GraphQL",
    url: "react",
    admin: { username: "MichaelJCompton" }
  }
];

const usersResult = client.mutate<AddUsersMutation, AddUsersMutationVariables>({
  mutation: AddUsersDocument,
  variables: { users },
});

usersResult.then(({ data }) => {
  console.log(`added ` + data?.addUser?.numUids + ` users`);
});

const projectsResult = client.mutate<
  AddProjectsMutation,
  AddProjectsMutationVariables
>({
  mutation: AddProjectsDocument,
  variables: { projects },
});

projectsResult.then(({ data, errors }) => {
  console.log(`added ` + data?.addProject?.numUids + ` projects`);
});


// FIXME: to add
// * columns
// * tickets
// * roles+perms
//
// Should we have some admin pages for site admins to manage users, add projects, etc.
//
// Create first users Michael and Apoorv as site admins
