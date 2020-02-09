// eslint-disable-next-line strict
'use strict';

const Model = require('../models/model.js');
const schema = require('../models/category-schema.js');

class Category extends Model {}

module.exports = new Category(schema);