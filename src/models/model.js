// eslint-disable-next-line strict
'use strict';

//////=================DYNAMIC MODEL =======================//////
class Model {
  constructor(schema){
    this.schema = schema;
  }
  //////============== CRUD ==================/////
  /**
   *  to read items from DB
   * @param {number} id
   */
  read(id){ /// read the items in the DB by it's Id
    if(id){
      return this.schema.find(id);
    }else{
      return this.schema.find({});
    }
  }
  /**
   * to create a new record
   * @param {object} record
   */
  create(record){ /// create any item in the database
    let newItem = new this.schema(record);
    return newItem.save();
  }

  /**
   * to update the record in the DB
   * @param {number} id
   * @param {object} record
   */
  put(id ,record){ // update item in DB by Id
    return this.schema.findByIdAndUpdate(id , record ,{new : true});
  }
  /**
   * to delete  item from DB
   * @param {number} id
   */
  delete(id){ // Delete item by id
    return this.schema.findByIdAndDelete(id);
  }
}
module.exports = Model;