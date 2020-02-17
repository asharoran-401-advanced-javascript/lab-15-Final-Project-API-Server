// eslint-disable-next-line strict
'use strict';

module.exports = (req , res , next) =>{
  console.log('Request Information :' , req.method , req.path);
  next();
};