/* eslint-disable camelcase */
/* eslint-disable strict */
'use strict';

const mongoose = require('mongoose');

//// require Parent Schema
require('../products/product-schema.js');

const categorySchema = mongoose.Schema({
  name : { type : String , require : true},
} ,{ toObject : { virtuals : true} , toJSON : { virtusls : true}});

categorySchema.virtual('actualCategory' , {
  ref : 'products',
  localField : 'name',
  foreignField : 'category',
  justOne : false});

categorySchema.pre('findOne', function() {
  try {
    this.populate('actualCategory');
  } catch(e) {
    console.error(e);
  }
});

module.exports = mongoose.model('categories' , categorySchema);