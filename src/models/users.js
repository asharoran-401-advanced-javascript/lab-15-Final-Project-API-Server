// eslint-disable-next-line strict
'use strict';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const users = new mongoose.Schema({ // make the schema to user info
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  role: {type: String, required: true, default:'user', enum:['user', 'editor', 'admin']},
});

// //------ Before Save hash password --> pre function --------//
let complixity = 5;
// //--------------- SignUp -------------//
users.pre('save', async function(){
  if (!users.username) {
    this.password = await bcrypt.hash(this.password, complixity);
  }
});

users.statics.authenticateBasic = function(auth) {
  return this.findOne({username:auth.username})
    .then(user => user.passCompare(auth.password))
    .catch(console.error);
};

users.methods.passCompare = function(password) {
  return bcrypt.compare(password, this.password)
    .then(valid => valid ? this : null);
};
// let SECRET = 'seecreetAshar';

users.methods.generateToken = function(user) {
  let token = jwt.sign({ username: user.username}, process.env.SECRET);
  return token;
};

users.statics.list =  async function(){
  let results = await this.find({});
  return results;
};

users.statics.authenticateToken = async function(token){
  try {
    let tokenObject = jwt.verify(token, process.env.SECRET);
    console.log(tokenObject);
    if (tokenObject.username) {
      return Promise.resolve(tokenObject);
    } else {
      return Promise.reject();
    }
  } catch (err) {
    return Promise.reject();
  }
};

users.statics.checkCapabilities = (capability, role)=>{
  console.log(capability, role);
  let admin = ['read, create, update, delete'];
  let editor = ['read, create, update'];
  let user = ['read'];

  if(role === 'admin' ){
    for(let i = 0; i < admin.length;i++){
      if(admin[i]) return true;
    }
  }
  if(role === 'editor' ){
    for(let i = 0; i < editor.length;i++){
      if(editor[i]) return true;
    }
  }
  if(role === 'user' ){
    for(let i = 0; i < user.length;i++){
      if(user[i]) return true;
    }
  }
  // Object.values(capabilities).forEach(val=>{
  //   console.log(val.includes(capability));
  // });
};

module.exports = mongoose.model('users',users);
