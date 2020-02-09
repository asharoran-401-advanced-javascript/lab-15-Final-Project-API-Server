// eslint-disable-next-line strict
'use strict';

const base64 = require('base-64');
const users = require('../user/users-schema.js');

// -------------- I need in this file To Modify Request So I use MiddleWare --------------//


//=========== Reads the encoded username and password from the Authentication header =====//
module.exports = (req , res , next) =>{ // Global MiddleWare
  if(!req.headers.authorization){
    console.log('req',req.headers);
    console.log('req.headers.authorization',req.headers.authorization);
    next('Invalid LogIn Please Try Again');
  }
  let basic = req.headers.authorization.split(' ').pop();
  let [username , password] = base64.decode(basic).split(':');
  //========= Checks the Users model to see if this is a valid user and the right password =========//
  users.authentication(username , password) //// to Check if this user is vakid in DB or Not
    .then(validUser =>{
    //======== If the user is valid, generate a token and append it to the request object =========//
      req.taken = users.generatendToken(validUser);
      next();
    })
    .catch( error => next('Invalid LogIn error'));
};

