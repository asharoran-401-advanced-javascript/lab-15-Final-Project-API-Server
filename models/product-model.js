// eslint-disable-next-line strict
'use strict';

const Model = require('../models/model.js');
const schema = require('../models/product-schema.js');

class Product extends Model {}

module.exports = new Product(schema);

