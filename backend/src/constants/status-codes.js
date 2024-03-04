const statusCodes = {
  //SUCCESS
  SUCCESS: 200,
  CREATED: 201,
  DELETED: 204,
  UPDATED: 204,
  //REDIRECT
  REDIRECT: 301,
  //CLIENT ERROR
  NOT_AUTHENTICATED: 401,
  NOT_AUTHORIZED: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  //SERVER ERROR
  SERVER_ERROR: 500,
};

export default statusCodes;
