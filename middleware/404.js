// eslint-disable-next-line strict
'use strict';

// eslint-disable-next-line no-unused-vars
function notFoundHandler(req, res, next) {
  res.status(404);
  res.statusMessage = 'Not Found!';
  res.json({ error: 'Not Found'});
}

module.exports = notFoundHandler;