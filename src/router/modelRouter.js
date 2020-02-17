/* eslint-disable no-unused-expressions */
// eslint-disable-next-line strict
'use strict';

// ================ SET UP OUR SERVER ================ //

const express = require('express');
const router = express.Router();

const category = require('../models/categories/category-model.js');
const product = require('../models/products/product-model.js');

const bearerAuth = require('../all-authFolders/bearer/bearer-middleware.js');
const acl = require('../all-authFolders/acl/acl-middleware.js');

/**
 * create finction to modularize the routes
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */
function getModel(req , res , next) {
// we use middlemare here to attach model to req.params (add Sth dynamic to req.params )
  let model = req.params.model;

  switch (model) {
  case 'category':
    req.model = category;
    next();
    return;
  case 'product':
    req.model = product;
    next();
    return;
  default:
    next('this Model is Not Exicts ');
    return;
  }
}

router.param('model' , getModel);

// ======================== USE Our Route =================== //

router.get('/api/v1/:model' ,bearerAuth, handleGetAll);
router.get('/api/v1/:model/:id', bearerAuth , handleGetOneById);
router.post('/api/v1/:model', bearerAuth ,acl('create'), handlePost);
router.put('/api/v1/:model/:id', bearerAuth, acl('update') , handleUpdate);
router.delete('/api/v1/:model/:id',bearerAuth, acl('delete') , handleDelete);

// ======================= CRUD function ===================== //

/**
 * retreive all records in the DB
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */
function handleGetAll(req , res , next) { // use PROMISE
  req.model.read() // read all the item in the DB
    .then( results =>{
      let count = results.length;
      console.log('++++++++' ,typeof results , typeof count , results);
      res.json({count , results});
    }).catch(next);
}

/**
 * retrieve one record from DB
 * @param {Object} req
 * @param {object} res
 * @param {object} next
 */
function handleGetOneById(req , res , next) {
  let id = req.params.id;
  req.model.read(id) // read just one item by using id
    .then( record =>{
      console.log('get oneeeeeeee' , record);
      res.status(200).json(record);
    }).catch(next);
}

/**
 * to create new record
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */
function handlePost(req , res , next) {
  req.model.create(req.body) // to create a new item and add it to my DB
    .then( record =>{
      console.log('get oneeeeeeee' , record);
      res.status(201).json(record);
    }).catch(next);
}
/**
 * to modify an existing record
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */
function handleUpdate(req , res , next) {
// to update item we need the id and the whole item so we need req.params.id and req.body
  let id = req.params.id;
  req.model.put( id , req.body) // to update item by using id
    .then( record =>{
      res.json(record);
      console.log('update oneeeeeeee' , record);
    }).catch(next);
}

/**
 * delete an item form DB
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */
function handleDelete(req , res , next) {
  let id = req.params.id;
  req.model.delete(id) // we can delete item from DB by using id
    .then (record =>{
      res.json(record);
      console.log('delte oneeeeeeee' , record);
    }).catch(next);
}

module.exports = router;
