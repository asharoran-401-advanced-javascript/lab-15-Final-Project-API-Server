// eslint-disable-next-line strict
'use strict';

const Model = require('../model.js');
const schema = require('./category-schema.js');

class Category extends Model {}

module.exports = new Category(schema);