// eslint-disable-next-line strict
// 'use strict';

const express = require('express');
const authRouter = express.Router();

const Users = require('../models/users.js');
const basicAuth = require('../all-authFolders/auth/auth-middleware.js');
const oauth = require('../all-authFolders/oauth/oauth-middleware.js');
const bearerAuth = require('../all-authFolders/bearer/bearer-middleware.js');

// // //---------------------- test route ---------------//
// // router.get('/test' , (req , res) =>{
// //   res.send('hellllo , its Me');
// // });
// // //----------------- Create a record by SignUp Route ------------//

authRouter.post('/signup', (req, res,next) => {
  let user = new Users(req.body);
  user.save()
    .then(data => {
      req.token = user.generateToken(data);
      res.status(200).send(req.token);
    }).catch(next);
});

authRouter.post('/signin', basicAuth, (req, res) => {
  res.status(200).send(req.token);
});

authRouter.get('/users',(req, res) => {
  Users.list()
    .then(data=>{
      res.status(200).json(data);
    });
});
//------------------------ Oauth -------------------//
authRouter.get('/oauth', oauth , (req, res) =>{
  res.status(200).send(req.token);
});
//---------------------- bearerAuth -----------------//

authRouter.get('/user', bearerAuth, (req, res) => {
  res.status(200).json(req.user);
});


module.exports = authRouter;