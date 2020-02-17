/* eslint-disable camelcase */
// eslint-disable-next-line strict
'use strict';

const {server } = require('../../lib/server.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);


describe('Api server for Product' , () =>{

  // ================================== CRUD TEST ============================================ //

  ////////////-------------- For Product Model -------------///////////////

  it('Can Read an items GET() from DB to Product model' , () =>{ // to read the items in DB
    return mockRequest
      .get('/api/v1/product')
      .then( results =>{
        expect(results.status).toBe(200);
      });
  });

  it('Can Create a new item and Post() in Product model' , () =>{
    let testObj = {category: 'bag' , display_name : 'susen' , description: 'great bag'};
    return mockRequest
      .post('/api/v1/product')
      .send(testObj)
      .then( results =>{
        expect(results.status).toBe(201);
        console.log('-----my new Obj ------' , results.body.category);
        expect(results.body.category).toBe(testObj.category);
      });

  });

  it('Can Update() an item in DB and PUT() in Product model' , () =>{ // we need to Create an obj then udpate it
    let testObj = {category: 'bag' , display_name : 'susen' , description: 'great bag'};
    return mockRequest
      .post('/api/v1/product')
      .send(testObj)
      .then( item =>{
        let editTestObj =  {category: 'bag' , display_name : 'Susen' , description: 'great  and coool bag'};
        return mockRequest
          .put(`/api/v1/product/${item.body._id}`)
          .send(editTestObj)
          .then( results =>{
            expect(results.status).toBe(200);
            console.log('------result-------' , results.body);
            expect(results.body.category).toBe(editTestObj.category);
            expect(results.body.description).toBe(editTestObj.description);
          });

      });

  });

  it('Can Delete() an item From DB in Product model' , () =>{  // we need to create a nw item then get it by id then Delete it
    let testObj = {category: 'bag' , display_name : 'susen' , description: 'great bag'};
    return mockRequest
      .post('/api/v1/product')
      .send(testObj)
      .then( item =>{
        return mockRequest
          .delete(`/api/v1/products/${item.body._id}`)
          .send(testObj)
          .then(results =>{
            console.log('----item deleted------' , results.body);
            expect(results.status).toBe(500);
            // eslint-disable-next-line no-undefined
            expect(results.body.value).toBe(undefined);
          });
      });
  });

});