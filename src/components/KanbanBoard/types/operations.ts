import * as Types from '../../../types/graphql';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

export type ProjectNameFragment = (
  { __typename?: 'Project' }
  & Pick<Types.Project, 'projID' | 'name'>
);

export type ColumnDetailsFragment = (
  { __typename?: 'Column' }
  & Pick<Types.Column, 'colID' | 'name'>
);

export type UserNamesFragment = (
  { __typename?: 'User' }
  & Pick<Types.User, 'username' | 'displayName'>
);

export type TicketDetailsFragment = (
  { __typename?: 'Ticket' }
  & Pick<Types.Ticket, 'id' | 'title' | 'description'>
  & { assignedTo?: Types.Maybe<Array<(
    { __typename?: 'User' }
    & UserNamesFragment
  )>> }
);

export type TicketWithColumnFragment = (
  { __typename?: 'Ticket' }
  & { onColumn: (
    { __typename?: 'Column' }
    & ColumnDetailsFragment
  ) }
  & TicketDetailsFragment
);

export type GetProjectQueryVariables = {
  projectID: Types.Scalars['ID'];
};


export type GetProjectQuery = (
  { __typename?: 'Query' }
  & { getProject?: Types.Maybe<(
    { __typename?: 'Project' }
    & { columns?: Types.Maybe<Array<Types.Maybe<(
      { __typename?: 'Column' }
      & { tickets?: Types.Maybe<Array<Types.Maybe<(
        { __typename?: 'Ticket' }
        & TicketDetailsFragment
      )>>> }
      & ColumnDetailsFragment
    )>>> }
    & ProjectNameFragment
  )> }
);

export type GetTicketQueryVariables = {
  ticketID: Types.Scalars['ID'];
};


export type GetTicketQuery = (
  { __typename?: 'Query' }
  & { getTicket?: Types.Maybe<(
    { __typename?: 'Ticket' }
    & TicketWithColumnFragment
  )> }
);

export type AddTicketMutationVariables = {
  ticket: Types.AddTicketInput;
};


export type AddTicketMutation = (
  { __typename?: 'Mutation' }
  & { addTicket?: Types.Maybe<(
    { __typename?: 'AddTicketPayload' }
    & { ticket?: Types.Maybe<Array<Types.Maybe<(
      { __typename?: 'Ticket' }
      & TicketWithColumnFragment
    )>>> }
  )> }
);

export type UpdateTicketMutationVariables = {
  ticketID: Types.Scalars['ID'];
  ticket?: Types.Maybe<Types.TicketPatch>;
};


export type UpdateTicketMutation = (
  { __typename?: 'Mutation' }
  & { updateTicket?: Types.Maybe<(
    { __typename?: 'UpdateTicketPayload' }
    & { ticket?: Types.Maybe<Array<Types.Maybe<(
      { __typename?: 'Ticket' }
      & TicketWithColumnFragment
    )>>> }
  )> }
);

export type DeleteTicketMutationVariables = {
  ticketID: Types.Scalars['ID'];
};


export type DeleteTicketMutation = (
  { __typename?: 'Mutation' }
  & { deleteTicket?: Types.Maybe<(
    { __typename?: 'DeleteTicketPayload' }
    & Pick<Types.DeleteTicketPayload, 'msg' | 'numUids'>
  )> }
);

export type AddColumnMutationVariables = {
  column: Types.AddColumnInput;
};


export type AddColumnMutation = (
  { __typename?: 'Mutation' }
  & { addColumn?: Types.Maybe<(
    { __typename?: 'AddColumnPayload' }
    & { column?: Types.Maybe<Array<Types.Maybe<(
      { __typename?: 'Column' }
      & ColumnDetailsFragment
    )>>> }
  )> }
);

export type UpdateColumnMutationVariables = {
  colID: Types.Scalars['ID'];
  ticketID: Types.Scalars['ID'];
};


export type UpdateColumnMutation = (
  { __typename?: 'Mutation' }
  & { updateColumn?: Types.Maybe<(
    { __typename?: 'UpdateColumnPayload' }
    & { column?: Types.Maybe<Array<Types.Maybe<(
      { __typename?: 'Column' }
      & ColumnDetailsFragment
    )>>> }
  )> }
);

export const ProjectNameFragmentDoc = gql`
    fragment projectName on Project {
  projID
  name
}
    `;
export const UserNamesFragmentDoc = gql`
    fragment userNames on User {
  username
  displayName
}
    `;
export const TicketDetailsFragmentDoc = gql`
    fragment ticketDetails on Ticket {
  id
  title
  description
  assignedTo {
    ...userNames
  }
}
    ${UserNamesFragmentDoc}`;
export const ColumnDetailsFragmentDoc = gql`
    fragment columnDetails on Column {
  colID
  name
}
    `;
export const TicketWithColumnFragmentDoc = gql`
    fragment ticketWithColumn on Ticket {
  ...ticketDetails
  onColumn {
    ...columnDetails
  }
}
    ${TicketDetailsFragmentDoc}
${ColumnDetailsFragmentDoc}`;
export const GetProjectDocument = gql`
    query getProject($projectID: ID!) {
  getProject(projID: $projectID) {
    ...projectName
    columns {
      ...columnDetails
      tickets {
        ...ticketDetails
      }
    }
  }
}
    ${ProjectNameFragmentDoc}
${ColumnDetailsFragmentDoc}
${TicketDetailsFragmentDoc}`;

/**
 * __useGetProjectQuery__
 *
 * To run a query within a React component, call `useGetProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectQuery({
 *   variables: {
 *      projectID: // value for 'projectID'
 *   },
 * });
 */
export function useGetProjectQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetProjectQuery, GetProjectQueryVariables>) {
        return ApolloReactHooks.useQuery<GetProjectQuery, GetProjectQueryVariables>(GetProjectDocument, baseOptions);
      }
export function useGetProjectLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetProjectQuery, GetProjectQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetProjectQuery, GetProjectQueryVariables>(GetProjectDocument, baseOptions);
        }
export type GetProjectQueryHookResult = ReturnType<typeof useGetProjectQuery>;
export type GetProjectLazyQueryHookResult = ReturnType<typeof useGetProjectLazyQuery>;
export type GetProjectQueryResult = ApolloReactCommon.QueryResult<GetProjectQuery, GetProjectQueryVariables>;
export const GetTicketDocument = gql`
    query getTicket($ticketID: ID!) {
  getTicket(id: $ticketID) {
    ...ticketWithColumn
  }
}
    ${TicketWithColumnFragmentDoc}`;

/**
 * __useGetTicketQuery__
 *
 * To run a query within a React component, call `useGetTicketQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTicketQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTicketQuery({
 *   variables: {
 *      ticketID: // value for 'ticketID'
 *   },
 * });
 */
export function useGetTicketQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetTicketQuery, GetTicketQueryVariables>) {
        return ApolloReactHooks.useQuery<GetTicketQuery, GetTicketQueryVariables>(GetTicketDocument, baseOptions);
      }
export function useGetTicketLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetTicketQuery, GetTicketQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetTicketQuery, GetTicketQueryVariables>(GetTicketDocument, baseOptions);
        }
export type GetTicketQueryHookResult = ReturnType<typeof useGetTicketQuery>;
export type GetTicketLazyQueryHookResult = ReturnType<typeof useGetTicketLazyQuery>;
export type GetTicketQueryResult = ApolloReactCommon.QueryResult<GetTicketQuery, GetTicketQueryVariables>;
export const AddTicketDocument = gql`
    mutation addTicket($ticket: AddTicketInput!) {
  addTicket(input: [$ticket]) {
    ticket {
      ...ticketWithColumn
    }
  }
}
    ${TicketWithColumnFragmentDoc}`;
export type AddTicketMutationFn = ApolloReactCommon.MutationFunction<AddTicketMutation, AddTicketMutationVariables>;

/**
 * __useAddTicketMutation__
 *
 * To run a mutation, you first call `useAddTicketMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTicketMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTicketMutation, { data, loading, error }] = useAddTicketMutation({
 *   variables: {
 *      ticket: // value for 'ticket'
 *   },
 * });
 */
export function useAddTicketMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddTicketMutation, AddTicketMutationVariables>) {
        return ApolloReactHooks.useMutation<AddTicketMutation, AddTicketMutationVariables>(AddTicketDocument, baseOptions);
      }
export type AddTicketMutationHookResult = ReturnType<typeof useAddTicketMutation>;
export type AddTicketMutationResult = ApolloReactCommon.MutationResult<AddTicketMutation>;
export type AddTicketMutationOptions = ApolloReactCommon.BaseMutationOptions<AddTicketMutation, AddTicketMutationVariables>;
export const UpdateTicketDocument = gql`
    mutation updateTicket($ticketID: ID!, $ticket: TicketPatch) {
  updateTicket(input: {filter: {id: [$ticketID]}, set: $ticket}) {
    ticket {
      ...ticketWithColumn
    }
  }
}
    ${TicketWithColumnFragmentDoc}`;
export type UpdateTicketMutationFn = ApolloReactCommon.MutationFunction<UpdateTicketMutation, UpdateTicketMutationVariables>;

/**
 * __useUpdateTicketMutation__
 *
 * To run a mutation, you first call `useUpdateTicketMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTicketMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTicketMutation, { data, loading, error }] = useUpdateTicketMutation({
 *   variables: {
 *      ticketID: // value for 'ticketID'
 *      ticket: // value for 'ticket'
 *   },
 * });
 */
export function useUpdateTicketMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateTicketMutation, UpdateTicketMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateTicketMutation, UpdateTicketMutationVariables>(UpdateTicketDocument, baseOptions);
      }
export type UpdateTicketMutationHookResult = ReturnType<typeof useUpdateTicketMutation>;
export type UpdateTicketMutationResult = ApolloReactCommon.MutationResult<UpdateTicketMutation>;
export type UpdateTicketMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateTicketMutation, UpdateTicketMutationVariables>;
export const DeleteTicketDocument = gql`
    mutation deleteTicket($ticketID: ID!) {
  deleteTicket(filter: {id: [$ticketID]}) {
    msg
    numUids
  }
}
    `;
export type DeleteTicketMutationFn = ApolloReactCommon.MutationFunction<DeleteTicketMutation, DeleteTicketMutationVariables>;

/**
 * __useDeleteTicketMutation__
 *
 * To run a mutation, you first call `useDeleteTicketMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTicketMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTicketMutation, { data, loading, error }] = useDeleteTicketMutation({
 *   variables: {
 *      ticketID: // value for 'ticketID'
 *   },
 * });
 */
export function useDeleteTicketMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteTicketMutation, DeleteTicketMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteTicketMutation, DeleteTicketMutationVariables>(DeleteTicketDocument, baseOptions);
      }
export type DeleteTicketMutationHookResult = ReturnType<typeof useDeleteTicketMutation>;
export type DeleteTicketMutationResult = ApolloReactCommon.MutationResult<DeleteTicketMutation>;
export type DeleteTicketMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteTicketMutation, DeleteTicketMutationVariables>;
export const AddColumnDocument = gql`
    mutation addColumn($column: AddColumnInput!) {
  addColumn(input: [$column]) {
    column {
      ...columnDetails
    }
  }
}
    ${ColumnDetailsFragmentDoc}`;
export type AddColumnMutationFn = ApolloReactCommon.MutationFunction<AddColumnMutation, AddColumnMutationVariables>;

/**
 * __useAddColumnMutation__
 *
 * To run a mutation, you first call `useAddColumnMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddColumnMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addColumnMutation, { data, loading, error }] = useAddColumnMutation({
 *   variables: {
 *      column: // value for 'column'
 *   },
 * });
 */
export function useAddColumnMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddColumnMutation, AddColumnMutationVariables>) {
        return ApolloReactHooks.useMutation<AddColumnMutation, AddColumnMutationVariables>(AddColumnDocument, baseOptions);
      }
export type AddColumnMutationHookResult = ReturnType<typeof useAddColumnMutation>;
export type AddColumnMutationResult = ApolloReactCommon.MutationResult<AddColumnMutation>;
export type AddColumnMutationOptions = ApolloReactCommon.BaseMutationOptions<AddColumnMutation, AddColumnMutationVariables>;
export const UpdateColumnDocument = gql`
    mutation updateColumn($colID: ID!, $ticketID: ID!) {
  updateColumn(input: {filter: {colID: [$colID]}, set: {tickets: [{id: $ticketID}]}}) {
    column {
      ...columnDetails
    }
  }
}
    ${ColumnDetailsFragmentDoc}`;
export type UpdateColumnMutationFn = ApolloReactCommon.MutationFunction<UpdateColumnMutation, UpdateColumnMutationVariables>;

/**
 * __useUpdateColumnMutation__
 *
 * To run a mutation, you first call `useUpdateColumnMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateColumnMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateColumnMutation, { data, loading, error }] = useUpdateColumnMutation({
 *   variables: {
 *      colID: // value for 'colID'
 *      ticketID: // value for 'ticketID'
 *   },
 * });
 */
export function useUpdateColumnMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateColumnMutation, UpdateColumnMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateColumnMutation, UpdateColumnMutationVariables>(UpdateColumnDocument, baseOptions);
      }
export type UpdateColumnMutationHookResult = ReturnType<typeof useUpdateColumnMutation>;
export type UpdateColumnMutationResult = ApolloReactCommon.MutationResult<UpdateColumnMutation>;
export type UpdateColumnMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateColumnMutation, UpdateColumnMutationVariables>;