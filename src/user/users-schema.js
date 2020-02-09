// eslint-disable-next-line strict
'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({ // make the schema to user info
  username : {type : String , require : true},
  password : { type : String , require : true},
  role : {type : String , enum : ['admin' , 'user' , 'editor' ]},
} ,{toObject : { virtuals : true} , toJSON : { virtuals : true}, // fack connection
});

const capabilities = {
  admin: ['create','read','update','delete'],
  user: ['read'],
  editor: ['create', 'read', 'update'],
};

//------ Before Save hash password --> pre function --------//
let complixity = 5;
//--------------- SignUp -------------//
userSchema.pre('save' ,  async function(record){
//   if(!userSchema.find(record)){
  this.password = await bcrypt.hash(this.password , complixity);
  // userSchema.username = record;
  // userSchema.save(record)
  return record;
});

userSchema.statics.authentication = (username , password) =>{
  console.log('user name' , username);
  return userSchema.findOne({username: this.username})
    .then( username =>{
      let isVoalid =  bcrypt.compare(password , this.password);
      console.log('password user' , password);
      return isVoalid ? username : Promise.reject();

    });
};
let SECRET = 'seecreetAshar';

userSchema.methods.generatendToken = () =>{
  let userInformaion = {
    username : this.username,
    // capabilities : this.role,
    capabilities: capabilities[this.role], //
  };
  let token = jwt.sign(userInformaion, SECRET);
  return token;
};

userSchema.statics.authenticationToken = function (token){
  try {
    let varifyToken =  jwt.verify(token , SECRET);
    if(varifyToken.username){
      Promise.resolve(varifyToken);
    }
    Promise.reject();
  }
  catch(error){
    console.error('error' , error);

  }
};

//------------------- try here bcause i can't add the role in acl file -----//

// userSchema.methods.acl = function(capability) {
//   return capabilities[this.role].includes(capability);
// };

// userSchema.statics.generateOauth = (username) =>{
//   if(!username) { return Promise.reject('Validation Error'); }
//   console.log('my user in Outh' , username);
//   this.findOne({username: this.username});
// };
//--------------- SignUp -------------//
// let hashingPw = async function(record){
//   if(!userSchema.username){
//     record.username = await bcrypt.hash(record.password , complixity);
//     userSchema.username = record;
//     return record;
//   }else{
//     return Promise.reject();
//   }
// };



module.exports = mongoose.model('users' , userSchema);

