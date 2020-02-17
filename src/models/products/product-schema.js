/* eslint-disable camelcase */
/* eslint-disable strict */
'use strict';

const mongoose = require('mongoose');

//// require Parent Schema
require('../categories/category-schema.js');

const productSchema = mongoose.Schema({
  category : { type : String , require : true},
  display_name : { type : String , require : true},
  description : { type : String },
} ,{ toObject : { virtuals : true} , toJSON : { virtusls : true}});

productSchema.virtual('actualProduct' , {
  ref : 'categories',
  localField : 'category',
  foreignField : 'name',
  justOne : false});

productSchema.pre('findOne', join);
/**
 * no parameter
 */
function join() {
  try {
    this.populate('actualProduct');
  } catch(e) {
    console.error(e);
  }
}

module.exports = mongoose.model('products' , productSchema);

