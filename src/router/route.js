// eslint-disable-next-line strict
'use strict';

const express = require('express');

const router = new express.Router();

const UserSchema = require('../user/users-schema.js');
const auth = require('../auth/auth-middleware.js');
const oauth = require('../oauth/oauth-middleware.js');
const bearer = require('../bearer/bearer-middleware.js');
const acl = require('../acl/acl-middleware.js');
//---------------------- test route ---------------//
router.get('/test' , (req , res) =>{
  res.send('hellllo , its Me');
});
//----------------- Create a record by SignUp Route ------------//

router.post('/signup' , (req , res, next) =>{
  let user = new UserSchema(req.body);
  //   console.log('useeeeer' , user);
  console.log('requset body ',req.body);
  user.save()
    .then( newUser =>{
      console.log('new user =====' , newUser);
      req.token = newUser.generatendToken();
      console.log('my req tokeeen () :' , req.token);
      res.send(req.token);
    })
    .catch(next);
});

router.post('/signin' ,auth, (req ,res , next) =>{
  res.status(200).send(req.token);
});

router.get('/users' ,auth, (req ,res  , next) =>{
//   let user = new UserSchema();
  UserSchema.get()
    .then( result =>{
      // let count = result.length;
      res.status(200).json(result);
    });
});
//------------------------ Oauth -------------------//
router.get('/oauth', oauth , (req, res , next) =>{
  res.status(200).send(req.token);
});
//------------------------ Bearer Auth ---------------//
router.get('/user' , bearer , (req , res, next) =>{
  res.status(200).json(req.user);
});

//---------------------
router.get('/public' , bearer , acl('public') , (req , res , next) =>{
  res.status(200). render('./public/index.html');
});

router.get('/private' , bearer , acl('private') , (req , res , next) =>{
  res.status(200).send('private information');
});

router.get('/readonly' , bearer , acl('readonly') , (req , res , next) =>{
  res.status(200).send('read only');
});

router.get('/create' , bearer , acl('create') , (req , res , next) =>{
  res.status(200).send('read');
});



router.get('/update' , bearer , acl('update') , (req , res , next) =>{
  res.status(200).send(' update autherization ');
});

router.get('/delete' , bearer , acl('delete') , (req , res , next) =>{
  res.status(200).send(' delete autherization');
});

router.get('/everything' , bearer , acl('everything') , (req , res , next) =>{
  res.status(200).send('greate you autherized');
});




module.exports = router;