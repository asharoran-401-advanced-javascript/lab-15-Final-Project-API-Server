// eslint-disable-next-line strict
'use strict';

function errorHandler(err ,req , res , next){
  res.status(500);
  res.statusMessage = 'Somthing Error in Server !!!';
  res.json({ error: err });
}

module.exports = errorHandler;