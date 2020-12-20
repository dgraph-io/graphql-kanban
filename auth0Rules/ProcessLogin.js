function (user, context, callback) {
  const { request } = require('graphql-request');
  const API = process.env.REACT_APP_DGRAPH_BACKEND;
  const CLAIMS = process.env.REACT_APP_AUTH0_CLAIMS_KEY;
  
  const GET_USER = `query GET_USER($username: String!) {
    getUser(username: $username) {
      username
      isAdmin
    }
  }`;
  const COUNT_USERS_AND_SEARCH = `query COUNT_USER_AND_SEARCH($username: String!) {
    aggregateUser {
      count
    }
    getUser(username: $username) {
      username
      isAdmin
    }
  }`;
  const ADD_USER = `mutation ADD_USER($username: String! $displayName: String! $isAdmin: Boolean) {
    addUser(input:[{
      username: $username
      displayName: $displayName
      isAdmin: $isAdmin
    }]) {
      user {
        username
        isAdmin
      }
    }
  }`;

  async function returnUser () {
    try {
      const getUserRes = await request(API, GET_USER, {
        username: user.email
      });
      const { getUser } = getUserRes;
      if (getUser===null) return checkUser();
      getUser.IS_ADMIN = (getUser && typeof getUser.isAdmin === 'boolean') ? getUser.isAdmin.toString() : "false";
      context.idToken[CLAIMS] = getUser;
      return callback(null, user, context);
    } catch (err) {
      console.error(err);
      return callback(null, user, context);
    }
  }
  
  async function createUser (variables) {
    try {
      const newUserRes = await request(API, ADD_USER, variables);
      const { addUser: { user: createdUser } } = newUserRes;
      console.log('Created User:', createdUser);
      if (Array.isArray(createdUser) && createdUser.length===1) {
        createdUser[0].IS_ADMIN = (typeof createdUser[0].isAdmin === 'boolean') ? createdUser[0].isAdmin.toString() : "false";
        context.idToken[CLAIMS] = createdUser[0];
      }
      return callback(null, user, context);
    } catch (err) {
      console.error(err);
      return callback(null, user, context);
    }
  }

  async function checkUser () {
    try {
      const response = await request(API, COUNT_USERS_AND_SEARCH, {
        username: user.email
      });
      const count = (
        response && response.aggregateUser && response.aggregateUser.count
      ) ? response.aggregateUser.count : 0;
      const getUser = (
        response && response.getUser
      ) ? response.getUser : { username: null, isAdmin: false };
      const { username, isAdmin } = getUser;

      // if the user already exists do not add again
      if (username === user.email) {
        console.log('User already exists:', username);
        context.idToken[CLAIMS] = { username, isAdmin, IS_ADMIN: (typeof isAdmin === 'boolean') ? isAdmin.toString() : "false" };
        return callback(null, user, context);
      }

      const userVariables = {
        username: user.email,
        // users registered via email and password will not have a name attribute
        displayName: user.name || user.email.match(/^([^@]*)@/)[1],
        // if this is the first user, make them an admin
        isAdmin: (count<1)
      };
      
      return createUser(userVariables);
    } catch (err) {
      console.error(err);
      return callback(err, user, context);
    }
  }

  if (context.stats.loginsCount>1) return returnUser();
  return checkUser();
}