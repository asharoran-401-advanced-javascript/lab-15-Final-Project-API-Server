// eslint-disable-next-line strict
'use strict';
const User = require('../../models/users.js');

//----------------------
module.exports = (capability) =>{
  return (req, res, next) => { // we wen to check the object
    try {
      console.log('req user ccccc() :' , req.user);
      if (User.checkCapabilities(capability, req.user.capability)) next();
      else next('access Control');
    }
    catch (error) {
      next('Invalid LogIn' , error);
    }

  };
};