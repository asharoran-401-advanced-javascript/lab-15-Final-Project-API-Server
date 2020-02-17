/* eslint-disable camelcase */
// /* eslint-disable camelcase */
// eslint-disable-next-line strict
'use strict';

const superagent = require('superagent'); // becuase we need to do request to the GitHub
const Users = require('../../models/users.js');

// //step 1 : here github give me a code after I signin // step 2 : I want to check the code and return a token ,
// // step 3 : so in the next request (signin) you autherize to get information (check if the user he is the same user (compare))
// // step 4 : so it return a user
// // step 5 : Now I need  user information (basic auth method) ,
// // step 6 : attach to give me access to user any route because I have token to access this routes

const tokenUrl = 'https://github.com/login/oauth/access_token';
const remoteAPI = 'https://api.github.com/user';
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const API_SERVER = process.env.API_SERVER;

module.exports = async function authorize(req, res, next) {
  try {
    let code = req.query.code;
    console.log('coddddde' , code);
    let remoteToken = await exchangeCodeForToken(code);
    console.log('remotr Token () :', remoteToken);
    let remoteUser = await getRemoteUserInfo(remoteToken);
    console.log( 'remote User() :' ,remoteUser);
    let [user, token] = await getUser(remoteUser);
    req.user = user;
    req.token = token;
    next();
  } catch(err) {
    next(err);
  }
};

async function exchangeCodeForToken(code) {
  let tokenResponse = await superagent.post(tokenUrl).send({
    code: code,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: API_SERVER,
    grant_type: 'authorization_code',
  });

  let access_token = tokenResponse.body.access_token;
  console.log('access TTTTToken' , access_token);
  return access_token;
}

async function getRemoteUserInfo(token) {
  let userResponse = await superagent.get(remoteAPI)
    .set('user-agent', 'express-app')
    .set('Authorization', `token ${token}`);

  let user = userResponse.body;
  return user;
}

async function getUser(remoteUser) {
  let userRecord = {
    username: remoteUser.login,
    password: '12345789ashaaaaaar',
  };
  console.log(' User Record () :' , userRecord.username);
  //   console.log('my brack user() :' , Users);
  let newUser = new Users(userRecord);
  let user = await newUser.save();
  let token = newUser.generateToken(user);

  return [user, token];
}




