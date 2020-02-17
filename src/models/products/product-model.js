// eslint-disable-next-line strict
'use strict';

const Model = require('../model.js');
const schema = require('../products/product-schema.js');

class Product extends Model {}

module.exports = new Product(schema);

