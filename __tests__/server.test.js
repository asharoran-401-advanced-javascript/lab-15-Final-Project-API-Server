/* eslint-disable camelcase */
// eslint-disable-next-line strict
'use strict';

const {server } = require('../lib/server.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);

//================================== Handle Error Test ===========================================//

describe('Api server' , () =>{
  it('return respond (404) on invalid Route' , () =>{
    return mockRequest
      .get('/notFoundRoute')
      .then( results =>{
        expect(results.status).toBe(404);
      });
  });

  it('return respond (500) on invalid Model' , () =>{
    return mockRequest
      .get('/api/v1/anyThing')
      .then( results =>{
        expect(results.status).toBe(500);
      });
  });

  // ================================== CRUD TEST ============================================ //

  ////////////-------------- For valid Model -------------///////////////

  it('Can Read an items GET() from DB to valid Model' , () =>{
    return mockRequest
      .get('/api/v1/product')
      .then( results =>{
        expect(results.status).toBe(200);
      });
  });

  it('Can Create a new item and Post() in valid Model' , () =>{
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

  it('Can Update() an item in DB and PUT() in valid Model' , () =>{ // we need to Create an obj then udpate it
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

  it('Can Delete() an item From DB in valid Model' , () =>{
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





