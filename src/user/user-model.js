// // eslint-disable-next-line strict
// 'use strict';


////////////////////////////////////////////////////// I'm try to do model for User but if fail ////////////////////////////////


// const userSchema = require('../user/users-schema.js');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// class User {
//   constructor(schema){
//     this.schema = schema;

//   }
//   //------------------Sign in --------------//
//   async authentication(username , password){
//     let isVoalid = await bcrypt.compare(password , userSchema.password);
//     return isVoalid ? userSchema.username : Promise.reject();
//   }
//   //--------------- SignIn/SignUp (Generat Toker) -------------//
//   async generatendToken(){
//     let SECRET = 'seecreetAshar';
//     let token = jwt.sign({username : this.schema.username} , SECRET);
//     return token;
//   }
//   list(){
//     return this.schema.findAll();
//   }
// }



// module.exports = User;