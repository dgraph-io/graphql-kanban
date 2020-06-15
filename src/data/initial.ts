import fetch from "cross-fetch";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { AddProjectInput, AddUserInput } from "../types/graphql";
import {
  AddProjectsDocument,
  AddProjectsMutation,
  AddProjectsMutationVariables,
  AddUsersDocument,
  AddUsersMutation,
  AddUsersMutationVariables,
} from "./types/operations";
import { GraphQLError } from "graphql";

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
    admin: { username: "shekarm" },
  },
  {
    name: "GraphQL",
    description: "Native GraphQL in Dgraph",
    url: "https://github.com/dgraph-io/dgraph",
    admin: { username: "MichaelJCompton" },
  },
  {
    name: "Badger",
    description: "Fast key-value DB in Go",
    url: "https://github.com/dgraph-io/dgraph",
    admin: { username: "jarifibrahim" },
  },
  {
    name: "GraphQL Kanban",
    description: "Project management app written with Dgraph GraphQL",
    url: "react",
    admin: { username: "MichaelJCompton" },
  },
];

async function installData(): Promise<Readonly<GraphQLError[]> | undefined> {
  const { data: usersData, errors: userErrors } = await client.mutate<
    AddUsersMutation,
    AddUsersMutationVariables
  >({
    mutation: AddUsersDocument,
    variables: { users },
  });

  if (userErrors) {
    return userErrors
  }

  console.log(`added ` + usersData?.addUser?.numUids + ` users`);

  const { data: projectsData, errors: projectsErrors } = await client.mutate<
    AddProjectsMutation,
    AddProjectsMutationVariables
  >({
    mutation: AddProjectsDocument,
    variables: { projects },
  });

  if (projectsErrors) {
    return projectsErrors
  }

  console.log(`added ` + projectsData?.addProject?.numUids + ` projects`);
}

const result = installData();
result.then((errs) => {
  if(errs) {
    console.log(`Failed !`);
    console.log(errs);
  }
})
