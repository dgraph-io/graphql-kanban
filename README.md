Project management kanban board app built with Dgraph GraphQL.  

*Currently in early stages development*

Tech stack:
* Backend:
  * [Dgraph GraphQL](https://dgraph.io/graphql)
* Frontend
  * [Apollo client v3.0 (React)](https://www.apollographql.com/docs/)
  * [GraphQL Code Generator](https://graphql-code-generator.com/) 
  * [semantic-ui-react](https://react.semantic-ui.com/)

Soon to come:

- [ ] Auth0 login
- [ ] Netify deploments
- [ ] Slash GraphQL backend
- [ ] Board view
 
# Running

```sh
yarn install
yarn run
```

# Starting an app like this

Basic set up of the app

```sh
npx create-react-app graphql-kanban --template typescript
cd graphql-kanban
npm install graphql @apollo/client react-router-dom semantic-ui-react semantic-ui-css react-trello
yarn add -D @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-operations @graphql-codegen/typescript-react-apollo @graphql-codegen/add @graphql-codegen/near-operation-file-preset @types/react-router-dom
yarn install
```

I also added `cross-fetch` and `ts-node` for the code that loads the initial data 

```
yarn add cross-fetch
yarn add -D ts-node
```

It's not necessary for the frontend app.

Once you've got a schema you can load that into Dgraph with 

```
curl -X POST localhost:8180/admin/schema --data-binary '@schema.graphql'
```

Then GraphQL Code Generator will generate types, hooks, etc. for your project

```
yarn graphql-codegen init
...answer questions...
yarn install
```

Set up scripts in package.json

```
"scripts": {
    ...
    "generate-types": "graphql-codegen --config codegen.yml",
    "sample-data": "ts-node -O '{\"module\": \"commonjs\"}' src/data/initial.ts"
    ...
}
```

Then you can run

```
yarn run generate-types
```

anytime your types change or you add a new query/mutation to the app and GraphQL Code Generator will regenerate.


Init the whole project with

```
yarn run sample-data
```

FIXME / TODO (some project wide things to change) : 
- get an icon/image set for new projects, add user, etc
  (or use only from https://img.icons8.com and acknowledge in the app footer )