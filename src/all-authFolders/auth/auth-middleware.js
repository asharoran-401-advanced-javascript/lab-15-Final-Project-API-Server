/* eslint-disable no-undef */
// eslint-disable-next-line strict
'use strict';

require('base-64');
const Users = require('../../models/users.js');

// // -------------- I need in this file To Modify Request So I use MiddleWare --------------//


// //=========== Reads the encoded username and password from the Authentication header =====//
module.exports = (req, res, next) => {
  let [authType, encodedString] = req.headers.authorization.split(/\s+/);

  switch(authType.toLowerCase()) {
  case 'basic':
    return authBasic(encodedString);
  default:
    break;
  }

  function authBasic(authString) {
    let base64Buffer = Buffer.from(authString,'base64');
    let bufferString = base64Buffer.toString();
    let [username,password] = bufferString.split(':');
    let auth = {username,password};
    console.log('auth() :' , auth);
    // let user = new Users();
    return Users.authenticateBasic(auth)
      .then( user =>{
        console.log(user);
        // req.user = user;
        req.token = user.generateToken(user);
        next();
      });
  }
};


