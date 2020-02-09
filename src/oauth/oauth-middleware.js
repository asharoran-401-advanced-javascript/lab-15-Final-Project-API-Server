/* eslint-disable camelcase */
// eslint-disable-next-line strict
'use strict';

const superagent = require('superagent'); // becuase we need to do request to the GitHub
const users = require('../user/users-schema.js');

//step 1 : here github give me a code after I signin // step 2 : I want to check the code and return a token ,
// step 3 : so in the next request (signin) you autherize to get information (check if the user he is the same user (compare))
// step 4 : so it return a user
// step 5 : Now I need  user information (basic auth method) ,
// step 6 : attach to give me access to user any route because I have token to access this routes

const tokenUrl = 'https://github.com/login/oauth/access_token';
const remoteApi = 'https://api.github.com/user';

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const API_SERVER = process.env.API_SERVER;

async function getTokenFromCode(code){
  let resToken = await superagent.post(tokenUrl).send({
    code:code,
    client_id:CLIENT_ID,
    client_secret:CLIENT_SECRET,
    redirect_uri: API_SERVER,
    grant_type: 'authorization_code',

  });

  let access_token = resToken.body.access_token; // res token is the res of the big object
  console.log('access TTTTToken' , access_token);
  return access_token;
}

async function getRemoteInformation(token){
  let resOfUser = await superagent.get(remoteApi)
    .set('user-agent' , 'express-app')
    .set('Authorization' , `token ${token}`);

  let user = resOfUser.body; /// initial scoping (user response (username , password))
  return user;
}

async function getUser(userRecord){
  let recordForUser = {
    username: userRecord.login,
    password: '12345789ashaaaaaar',
  };
  console.log(' User Record () :' , recordForUser.username);
  console.log('my brack user() :' , users);
  let user = await users.generateOauth(recordForUser);
  let token = users.generatendToken(user);

  return [user ,token];
}
// code is tokrn in some degree
module.exports = async function authorization(req , res , next){ // to call all the function
  try{
    let code = req.query.code; // to give me access (like green light )
    console.log('coddddde' , code);

    let remoteToken = await getTokenFromCode(code); // so the github give me token and the code from login screen
    console.log('remotr Token () :', remoteToken);


    let remoteUsers = await getRemoteInformation(remoteToken);
    console.log( 'remote User() :' ,remoteUsers);

    let [user , token] = await getUser(remoteUsers);
    req.user = user; // the first index from apove array
    req.token = token; // the secand index from the apove array
    console.log('req token ()' , req.token);
    next();
  }
  catch(error){
    next(`error ${error}`);
  }
};





