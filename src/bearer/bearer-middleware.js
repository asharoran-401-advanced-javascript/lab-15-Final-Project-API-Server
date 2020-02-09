// eslint-disable-next-line strict
'use strict';

const users = require('../user/users-schema.js');


module.exports = (req, res , next) =>{
  if(!req.headers.authorization) {next('invalid Login please try again');}

  let token = req.headers.authorization.split(' ').pop();

  users.authenticationToken(token)
    .then( user =>{
      req.user = user;
      next();
    })
    .catch( error => next(error));
};

