// eslint-disable-next-line strict
'use strict';

//----------- First step make the Enviroment Ready --------------//
require('dotenv').config();

//---------------- 3rd parrty dependencies --------------//
const server = require('./src/lib/server.js');
const mongoose = require('mongoose');

//------------------ Connect My App With DB  ------------------//

const mongooseOptions = {
  useNewUrlParser :true ,
  useCreateIndex : true ,
  useUnifiedTopology : true};

mongoose.connect(process.env.MONGODB_URI , mongooseOptions);

server.start(process.env.PORT);