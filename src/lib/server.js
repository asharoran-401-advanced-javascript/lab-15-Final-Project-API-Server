// eslint-disable-next-line strict
'use strict';

//----------------------- 3rd parrty Dependencies  ------------//
// require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const logger = require('../lib/logger.js');
// const User = require('../user/user-model.js');
const router = require('../router/route.js');
const notFoundError = require('../middleware/404.js');
const errorHandler = require('../middleware/500.js');

//---------------------- My application Constants -------------//
const server = express();
server.use(express.json());
server.use(express.urlencoded({extended:true}));
server.use(cors());
server.use(morgan('dev'));
server.use(express.static('./public'));
server.use(logger);
server.use(router);

//--------------------- Catch Call (Error) -----------------//
server.use(notFoundError);
server.use(errorHandler);
//------------------- Fire My server -------------//
module.exports = {
  server : server,
  start : port =>{
    let PORT = port || process.env.PORT || 3300;
    server.listen(PORT , () =>{ console.log(`My Server is Work at ${PORT}`);});
  },
};
