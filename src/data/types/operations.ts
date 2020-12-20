import * as Types from '../../types/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type AddProjectsMutationVariables = Types.Exact<{
  projects: Array<Types.AddProjectInput>;
}>;


export type AddProjectsMutation = (
  { __typename?: 'Mutation' }
  & { addProject?: Types.Maybe<(
    { __typename?: 'AddProjectPayload' }
    & Pick<Types.AddProjectPayload, 'numUids'>
    & { project?: Types.Maybe<Array<Types.Maybe<(
      { __typename?: 'Project' }
      & Pick<Types.Project, 'projID' | 'name'>
    )>>> }
  )> }
);

export type AddUsersMutationVariables = Types.Exact<{
  users: Array<Types.AddUserInput>;
}>;


export type AddUsersMutation = (
  { __typename?: 'Mutation' }
  & { addUser?: Types.Maybe<(
    { __typename?: 'AddUserPayload' }
    & Pick<Types.AddUserPayload, 'numUids'>
    & { user?: Types.Maybe<Array<Types.Maybe<(
      { __typename?: 'User' }
      & Pick<Types.User, 'username' | 'displayName'>
    )>>> }
  )> }
);


export const AddProjectsDocument = gql`
    mutation addProjects($projects: [AddProjectInput!]!) {
  addProject(input: $projects) {
    project {
      projID
      name
    }
    numUids
  }
}
    `;
export type AddProjectsMutationFn = Apollo.MutationFunction<AddProjectsMutation, AddProjectsMutationVariables>;

/**
 * __useAddProjectsMutation__
 *
 * To run a mutation, you first call `useAddProjectsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProjectsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProjectsMutation, { data, loading, error }] = useAddProjectsMutation({
 *   variables: {
 *      projects: // value for 'projects'
 *   },
 * });
 */
export function useAddProjectsMutation(baseOptions?: Apollo.MutationHookOptions<AddProjectsMutation, AddProjectsMutationVariables>) {
        return Apollo.useMutation<AddProjectsMutation, AddProjectsMutationVariables>(AddProjectsDocument, baseOptions);
      }
export type AddProjectsMutationHookResult = ReturnType<typeof useAddProjectsMutation>;
export type AddProjectsMutationResult = Apollo.MutationResult<AddProjectsMutation>;
export type AddProjectsMutationOptions = Apollo.BaseMutationOptions<AddProjectsMutation, AddProjectsMutationVariables>;
export const AddUsersDocument = gql`
    mutation addUsers($users: [AddUserInput!]!) {
  addUser(input: $users) {
    user {
      username
      displayName
    }
    numUids
  }
}
    `;
export type AddUsersMutationFn = Apollo.MutationFunction<AddUsersMutation, AddUsersMutationVariables>;

/**
 * __useAddUsersMutation__
 *
 * To run a mutation, you first call `useAddUsersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUsersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUsersMutation, { data, loading, error }] = useAddUsersMutation({
 *   variables: {
 *      users: // value for 'users'
 *   },
 * });
 */
export function useAddUsersMutation(baseOptions?: Apollo.MutationHookOptions<AddUsersMutation, AddUsersMutationVariables>) {
        return Apollo.useMutation<AddUsersMutation, AddUsersMutationVariables>(AddUsersDocument, baseOptions);
      }
export type AddUsersMutationHookResult = ReturnType<typeof useAddUsersMutation>;
export type AddUsersMutationResult = Apollo.MutationResult<AddUsersMutation>;
export type AddUsersMutationOptions = Apollo.BaseMutationOptions<AddUsersMutation, AddUsersMutationVariables>;