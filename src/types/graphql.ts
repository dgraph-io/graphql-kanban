export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type AddTicketPayload = {
  __typename?: 'AddTicketPayload';
  ticket?: Maybe<Array<Maybe<Ticket>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type AddTicketPayloadTicketArgs = {
  filter?: Maybe<TicketFilter>;
  order?: Maybe<TicketOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addUser?: Maybe<AddUserPayload>;
  updateUser?: Maybe<UpdateUserPayload>;
  deleteUser?: Maybe<DeleteUserPayload>;
  addProject?: Maybe<AddProjectPayload>;
  updateProject?: Maybe<UpdateProjectPayload>;
  deleteProject?: Maybe<DeleteProjectPayload>;
  addRole?: Maybe<AddRolePayload>;
  updateRole?: Maybe<UpdateRolePayload>;
  deleteRole?: Maybe<DeleteRolePayload>;
  addColumn?: Maybe<AddColumnPayload>;
  updateColumn?: Maybe<UpdateColumnPayload>;
  deleteColumn?: Maybe<DeleteColumnPayload>;
  addTicket?: Maybe<AddTicketPayload>;
  updateTicket?: Maybe<UpdateTicketPayload>;
  deleteTicket?: Maybe<DeleteTicketPayload>;
};


export type MutationAddUserArgs = {
  input: Array<AddUserInput>;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationDeleteUserArgs = {
  filter: UserFilter;
};


export type MutationAddProjectArgs = {
  input: Array<AddProjectInput>;
};


export type MutationUpdateProjectArgs = {
  input: UpdateProjectInput;
};


export type MutationDeleteProjectArgs = {
  filter: ProjectFilter;
};


export type MutationAddRoleArgs = {
  input: Array<AddRoleInput>;
};


export type MutationUpdateRoleArgs = {
  input: UpdateRoleInput;
};


export type MutationDeleteRoleArgs = {
  filter: RoleFilter;
};


export type MutationAddColumnArgs = {
  input: Array<AddColumnInput>;
};


export type MutationUpdateColumnArgs = {
  input: UpdateColumnInput;
};


export type MutationDeleteColumnArgs = {
  filter: ColumnFilter;
};


export type MutationAddTicketArgs = {
  input: Array<AddTicketInput>;
};


export type MutationUpdateTicketArgs = {
  input: UpdateTicketInput;
};


export type MutationDeleteTicketArgs = {
  filter: TicketFilter;
};

export type DateTimeFilter = {
  eq?: Maybe<Scalars['DateTime']>;
  le?: Maybe<Scalars['DateTime']>;
  lt?: Maybe<Scalars['DateTime']>;
  ge?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
};

export type StringHashFilter = {
  eq?: Maybe<Scalars['String']>;
};

export type AddUserPayload = {
  __typename?: 'AddUserPayload';
  user?: Maybe<Array<Maybe<User>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type AddUserPayloadUserArgs = {
  filter?: Maybe<UserFilter>;
  order?: Maybe<UserOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type DeleteUserPayload = {
  __typename?: 'DeleteUserPayload';
  msg?: Maybe<Scalars['String']>;
  numUids?: Maybe<Scalars['Int']>;
};

export type UpdateUserPayload = {
  __typename?: 'UpdateUserPayload';
  user?: Maybe<Array<Maybe<User>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type UpdateUserPayloadUserArgs = {
  filter?: Maybe<UserFilter>;
  order?: Maybe<UserOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type AddProjectInput = {
  name: Scalars['String'];
  url?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  admin?: Maybe<UserRef>;
  roles?: Maybe<Array<Maybe<RoleRef>>>;
  columns?: Maybe<Array<Maybe<ColumnRef>>>;
};

export type RoleRef = {
  id?: Maybe<Scalars['ID']>;
  permission?: Maybe<Array<Maybe<Permission>>>;
  assignedTo?: Maybe<Array<Maybe<UserRef>>>;
};

export type AddProjectPayload = {
  __typename?: 'AddProjectPayload';
  project?: Maybe<Array<Maybe<Project>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type AddProjectPayloadProjectArgs = {
  filter?: Maybe<ProjectFilter>;
  order?: Maybe<ProjectOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type ProjectPatch = {
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  admin?: Maybe<UserRef>;
  roles?: Maybe<Array<Maybe<RoleRef>>>;
  columns?: Maybe<Array<Maybe<ColumnRef>>>;
};

export type ProjectRef = {
  projID?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  admin?: Maybe<UserRef>;
  roles?: Maybe<Array<Maybe<RoleRef>>>;
  columns?: Maybe<Array<Maybe<ColumnRef>>>;
};

export type UpdateColumnInput = {
  filter: ColumnFilter;
  set?: Maybe<ColumnPatch>;
  remove?: Maybe<ColumnPatch>;
};

export type UserFilter = {
  username?: Maybe<StringHashFilter>;
  and?: Maybe<UserFilter>;
  or?: Maybe<UserFilter>;
  not?: Maybe<UserFilter>;
};

export type FloatFilter = {
  eq?: Maybe<Scalars['Float']>;
  le?: Maybe<Scalars['Float']>;
  lt?: Maybe<Scalars['Float']>;
  ge?: Maybe<Scalars['Float']>;
  gt?: Maybe<Scalars['Float']>;
};

export type Permission_Hash = {
  eq?: Maybe<Array<Maybe<Permission>>>;
};

export type RolePatch = {
  permission?: Maybe<Array<Maybe<Permission>>>;
  assignedTo?: Maybe<Array<Maybe<UserRef>>>;
};

export type CustomHttp = {
  url: Scalars['String'];
  method: HttpMethod;
  body?: Maybe<Scalars['String']>;
  graphql?: Maybe<Scalars['String']>;
  mode?: Maybe<Mode>;
  forwardHeaders?: Maybe<Array<Scalars['String']>>;
  skipIntrospection?: Maybe<Scalars['Boolean']>;
};

export type StringExactFilter = {
  eq?: Maybe<Scalars['String']>;
  le?: Maybe<Scalars['String']>;
  lt?: Maybe<Scalars['String']>;
  ge?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
};

export enum TicketOrderable {
  Title = 'title',
  Description = 'description'
}

export type ColumnPatch = {
  inProject?: Maybe<ProjectRef>;
  name?: Maybe<Scalars['String']>;
  orderPreference?: Maybe<Scalars['Int']>;
  tickets?: Maybe<Array<Maybe<TicketRef>>>;
};

export type TicketRef = {
  id?: Maybe<Scalars['ID']>;
  onColumn?: Maybe<ColumnRef>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  assignedTo?: Maybe<Array<UserRef>>;
};

export enum HttpMethod {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Patch = 'PATCH',
  Delete = 'DELETE'
}

export type DeleteTicketPayload = {
  __typename?: 'DeleteTicketPayload';
  msg?: Maybe<Scalars['String']>;
  numUids?: Maybe<Scalars['Int']>;
};

export type UpdateColumnPayload = {
  __typename?: 'UpdateColumnPayload';
  column?: Maybe<Array<Maybe<Column>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type UpdateColumnPayloadColumnArgs = {
  filter?: Maybe<ColumnFilter>;
  order?: Maybe<ColumnOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type UpdateRolePayload = {
  __typename?: 'UpdateRolePayload';
  role?: Maybe<Array<Maybe<Role>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type UpdateRolePayloadRoleArgs = {
  filter?: Maybe<RoleFilter>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type UpdateProjectInput = {
  filter: ProjectFilter;
  set?: Maybe<ProjectPatch>;
  remove?: Maybe<ProjectPatch>;
};


export type StringTermFilter = {
  allofterms?: Maybe<Scalars['String']>;
  anyofterms?: Maybe<Scalars['String']>;
};

export type RoleFilter = {
  id?: Maybe<Array<Scalars['ID']>>;
  permission?: Maybe<Permission_Hash>;
  and?: Maybe<RoleFilter>;
  or?: Maybe<RoleFilter>;
  not?: Maybe<RoleFilter>;
};

export type Ticket = {
  __typename?: 'Ticket';
  id: Scalars['ID'];
  onColumn: Column;
  title: Scalars['String'];
  description: Scalars['String'];
  assignedTo?: Maybe<Array<User>>;
};


export type TicketOnColumnArgs = {
  filter?: Maybe<ColumnFilter>;
};


export type TicketAssignedToArgs = {
  filter?: Maybe<UserFilter>;
  order?: Maybe<UserOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export enum DgraphIndex {
  Int = 'int',
  Float = 'float',
  Bool = 'bool',
  Hash = 'hash',
  Exact = 'exact',
  Term = 'term',
  Fulltext = 'fulltext',
  Trigram = 'trigram',
  Regexp = 'regexp',
  Year = 'year',
  Month = 'month',
  Day = 'day',
  Hour = 'hour'
}

export type DeleteColumnPayload = {
  __typename?: 'DeleteColumnPayload';
  msg?: Maybe<Scalars['String']>;
  numUids?: Maybe<Scalars['Int']>;
};

export type UpdateTicketPayload = {
  __typename?: 'UpdateTicketPayload';
  ticket?: Maybe<Array<Maybe<Ticket>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type UpdateTicketPayloadTicketArgs = {
  filter?: Maybe<TicketFilter>;
  order?: Maybe<TicketOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type UserRef = {
  username?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  isAdmin?: Maybe<Scalars['Boolean']>;
  tickets?: Maybe<Array<Maybe<TicketRef>>>;
};

export type AuthRule = {
  and?: Maybe<Array<Maybe<AuthRule>>>;
  or?: Maybe<Array<Maybe<AuthRule>>>;
  not?: Maybe<AuthRule>;
  rule?: Maybe<Scalars['String']>;
};

export enum Mode {
  Batch = 'BATCH',
  Single = 'SINGLE'
}

export type StringRegExpFilter = {
  regexp?: Maybe<Scalars['String']>;
};

export type DeleteProjectPayload = {
  __typename?: 'DeleteProjectPayload';
  msg?: Maybe<Scalars['String']>;
  numUids?: Maybe<Scalars['Int']>;
};

export enum ProjectOrderable {
  Name = 'name',
  Url = 'url',
  Description = 'description'
}

export type AddRoleInput = {
  permission?: Maybe<Array<Maybe<Permission>>>;
  assignedTo?: Maybe<Array<Maybe<UserRef>>>;
};

export type UpdateRoleInput = {
  filter: RoleFilter;
  set?: Maybe<RolePatch>;
  remove?: Maybe<RolePatch>;
};

export type AddColumnPayload = {
  __typename?: 'AddColumnPayload';
  column?: Maybe<Array<Maybe<Column>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type AddColumnPayloadColumnArgs = {
  filter?: Maybe<ColumnFilter>;
  order?: Maybe<ColumnOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type ColumnOrder = {
  asc?: Maybe<ColumnOrderable>;
  desc?: Maybe<ColumnOrderable>;
  then?: Maybe<ColumnOrder>;
};

export type TicketOrder = {
  asc?: Maybe<TicketOrderable>;
  desc?: Maybe<TicketOrderable>;
  then?: Maybe<TicketOrder>;
};

export type UpdateUserInput = {
  filter: UserFilter;
  set?: Maybe<UserPatch>;
  remove?: Maybe<UserPatch>;
};

export type Query = {
  __typename?: 'Query';
  getUser?: Maybe<User>;
  queryUser?: Maybe<Array<Maybe<User>>>;
  getProject?: Maybe<Project>;
  queryProject?: Maybe<Array<Maybe<Project>>>;
  getRole?: Maybe<Role>;
  queryRole?: Maybe<Array<Maybe<Role>>>;
  getColumn?: Maybe<Column>;
  queryColumn?: Maybe<Array<Maybe<Column>>>;
  getTicket?: Maybe<Ticket>;
  queryTicket?: Maybe<Array<Maybe<Ticket>>>;
};


export type QueryGetUserArgs = {
  username: Scalars['String'];
};


export type QueryQueryUserArgs = {
  filter?: Maybe<UserFilter>;
  order?: Maybe<UserOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryGetProjectArgs = {
  projID: Scalars['ID'];
};


export type QueryQueryProjectArgs = {
  filter?: Maybe<ProjectFilter>;
  order?: Maybe<ProjectOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryGetRoleArgs = {
  id: Scalars['ID'];
};


export type QueryQueryRoleArgs = {
  filter?: Maybe<RoleFilter>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryGetColumnArgs = {
  colID: Scalars['ID'];
};


export type QueryQueryColumnArgs = {
  filter?: Maybe<ColumnFilter>;
  order?: Maybe<ColumnOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryGetTicketArgs = {
  id: Scalars['ID'];
};


export type QueryQueryTicketArgs = {
  filter?: Maybe<TicketFilter>;
  order?: Maybe<TicketOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export enum Permission {
  View = 'VIEW',
  Edit = 'EDIT'
}

export type UpdateProjectPayload = {
  __typename?: 'UpdateProjectPayload';
  project?: Maybe<Array<Maybe<Project>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type UpdateProjectPayloadProjectArgs = {
  filter?: Maybe<ProjectFilter>;
  order?: Maybe<ProjectOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type AddColumnInput = {
  inProject: ProjectRef;
  name: Scalars['String'];
  orderPreference: Scalars['Int'];
  tickets?: Maybe<Array<Maybe<TicketRef>>>;
};

export type TicketFilter = {
  id?: Maybe<Array<Scalars['ID']>>;
  title?: Maybe<StringTermFilter>;
  and?: Maybe<TicketFilter>;
  or?: Maybe<TicketFilter>;
  not?: Maybe<TicketFilter>;
};

export type UserOrder = {
  asc?: Maybe<UserOrderable>;
  desc?: Maybe<UserOrderable>;
  then?: Maybe<UserOrder>;
};

export type AddRolePayload = {
  __typename?: 'AddRolePayload';
  role?: Maybe<Array<Maybe<Role>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type AddRolePayloadRoleArgs = {
  filter?: Maybe<RoleFilter>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export enum UserOrderable {
  Username = 'username',
  DisplayName = 'displayName'
}

export type ProjectFilter = {
  projID?: Maybe<Array<Scalars['ID']>>;
  name?: Maybe<StringTermFilter>;
  and?: Maybe<ProjectFilter>;
  or?: Maybe<ProjectFilter>;
  not?: Maybe<ProjectFilter>;
};

export type DeleteRolePayload = {
  __typename?: 'DeleteRolePayload';
  msg?: Maybe<Scalars['String']>;
  numUids?: Maybe<Scalars['Int']>;
};

export type AddUserInput = {
  username: Scalars['String'];
  displayName?: Maybe<Scalars['String']>;
  isAdmin?: Maybe<Scalars['Boolean']>;
  tickets?: Maybe<Array<Maybe<TicketRef>>>;
};

export type ColumnFilter = {
  colID?: Maybe<Array<Scalars['ID']>>;
  not?: Maybe<ColumnFilter>;
};

export type AddTicketInput = {
  onColumn: ColumnRef;
  title: Scalars['String'];
  description: Scalars['String'];
  assignedTo?: Maybe<Array<UserRef>>;
};

export type ColumnRef = {
  colID?: Maybe<Scalars['ID']>;
  inProject?: Maybe<ProjectRef>;
  name?: Maybe<Scalars['String']>;
  orderPreference?: Maybe<Scalars['Int']>;
  tickets?: Maybe<Array<Maybe<TicketRef>>>;
};

export type TicketPatch = {
  onColumn?: Maybe<ColumnRef>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  assignedTo?: Maybe<Array<UserRef>>;
};

export type UserPatch = {
  displayName?: Maybe<Scalars['String']>;
  isAdmin?: Maybe<Scalars['Boolean']>;
  tickets?: Maybe<Array<Maybe<TicketRef>>>;
};

export type StringFullTextFilter = {
  alloftext?: Maybe<Scalars['String']>;
  anyoftext?: Maybe<Scalars['String']>;
};

export type Project = {
  __typename?: 'Project';
  projID: Scalars['ID'];
  name: Scalars['String'];
  url?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  admin?: Maybe<User>;
  roles?: Maybe<Array<Maybe<Role>>>;
  columns?: Maybe<Array<Maybe<Column>>>;
};


export type ProjectAdminArgs = {
  filter?: Maybe<UserFilter>;
};


export type ProjectRolesArgs = {
  filter?: Maybe<RoleFilter>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type ProjectColumnsArgs = {
  filter?: Maybe<ColumnFilter>;
  order?: Maybe<ColumnOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type Role = {
  __typename?: 'Role';
  id: Scalars['ID'];
  permission?: Maybe<Array<Maybe<Permission>>>;
  assignedTo?: Maybe<Array<Maybe<User>>>;
};


export type RolePermissionArgs = {
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RoleAssignedToArgs = {
  filter?: Maybe<UserFilter>;
  order?: Maybe<UserOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type Column = {
  __typename?: 'Column';
  colID: Scalars['ID'];
  inProject: Project;
  name: Scalars['String'];
  orderPreference: Scalars['Int'];
  tickets?: Maybe<Array<Maybe<Ticket>>>;
};


export type ColumnInProjectArgs = {
  filter?: Maybe<ProjectFilter>;
};


export type ColumnTicketsArgs = {
  filter?: Maybe<TicketFilter>;
  order?: Maybe<TicketOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export enum ColumnOrderable {
  Name = 'name',
  OrderPreference = 'orderPreference'
}

export type User = {
  __typename?: 'User';
  username: Scalars['String'];
  displayName?: Maybe<Scalars['String']>;
  isAdmin?: Maybe<Scalars['Boolean']>;
  tickets?: Maybe<Array<Maybe<Ticket>>>;
};


export type UserTicketsArgs = {
  filter?: Maybe<TicketFilter>;
  order?: Maybe<TicketOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type ProjectOrder = {
  asc?: Maybe<ProjectOrderable>;
  desc?: Maybe<ProjectOrderable>;
  then?: Maybe<ProjectOrder>;
};

export type UpdateTicketInput = {
  filter: TicketFilter;
  set?: Maybe<TicketPatch>;
  remove?: Maybe<TicketPatch>;
};

export type IntFilter = {
  eq?: Maybe<Scalars['Int']>;
  le?: Maybe<Scalars['Int']>;
  lt?: Maybe<Scalars['Int']>;
  ge?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
};
