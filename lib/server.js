// eslint-disable-next-line strict
'use strict';

////////      we need four part in the server js     ////////

//============= part 1 : 3rs party dependencies ==============//
const express = require('express');
const morgan = require('morgan'); // No need to it now
const cors = require('cors'); // My applicstion is sharing to any one
const logReq = require('../lib/logger.js');
//=================== part 2 : Middleware CatchCall ===================//
const notFoundError = require('../middleware/404.js');
const errorHandler = require('../middleware/500.js');

//=================== part 3 : Routes =====================////
const apiRouter = require('../router/v1.js');

//=================== part 4 : Appliction Constant ==========//
const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json()); // use it to parse Json body
app.use(express.urlencoded({extended:true})); // use to parse URL/encoded body // NOw need to it // but I add it as extra info
app.use(logReq); // to show me the req method and Path
app.use(apiRouter);
app.use(notFoundError);
app.use(errorHandler);
// exports our server
module.exports = {
  server : app ,
  start : (port) =>{
    let PORT = port || process.env.PORT || 3500;
    app.listen( PORT , () => console.log(`Server Listening At ${PORT}`));
  },
};


