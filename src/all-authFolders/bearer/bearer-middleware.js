
// eslint-disable-next-line strict
'use strict';

const Users = require('../../models/users.js');

module.exports = (req, res, next) => {
  if (!req.headers.authorization) { next('invalid login'); }

  console.log('req header',req.headers.authorization);
  req.token = req.headers.authorization.split(' ').pop();
  console.log('token() :' , req.token);

  Users.authenticateToken(req.token)
    .then(validUser => {
      req.user = validUser;
      console.log('req userrrr () :' , validUser);
      next();
    }).catch(err => next(err));
};
