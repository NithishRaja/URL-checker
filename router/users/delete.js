/*
 * File containing logic for delete method of users route
 *
 */

// Dependencies
const _data = require("./../../lib/data");

// Initializing delete function
const remove = function(data, callback){
  // Validating phone field
  const phone = typeof(data.query.phone)=="string"&&data.query.phone.trim().length==10?data.query.phone.trim():false;
  if(phone){
    // Checking if file exists
    _data.read(phone, "users", function(err, data){
      if(!err){
        _data.delete(phone, "users", function(err){
          if(!err){
            callback(200);
          }else{
            console.log(err);
            callback(500, {"Error":"Unable to delete file"});
          }
        });
      }else{
        console.log(err);
        callback(500, {"Error":"Unable to read from file"});
      }
    });
  }else{
    callback(400, {"Error":"Missing specified fields"});
  }
}

// Exporting module
module.exports = remove;
