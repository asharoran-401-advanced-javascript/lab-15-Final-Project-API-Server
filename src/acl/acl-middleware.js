// eslint-disable-next-line strict
'use strict';
//----------------------
module.exports = (capability) =>{
  return (req, res, next) => { // we wen to check the object
    try {
      if (req.capability.includes(capability)) next();
      else next('access Control');
    }
    catch (error) {
      next('Invalid LogIn' , error);
    }

  };
};