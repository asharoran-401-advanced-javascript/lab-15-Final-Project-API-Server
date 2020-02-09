// eslint-disable-next-line strict
'use strict';

function notFoundhandler(req , res , next){
  res.status(404);
  res.statusMessage = 'Not Found';
  res.json({error : 'Not Found'});
}

module.exports = notFoundhandler;