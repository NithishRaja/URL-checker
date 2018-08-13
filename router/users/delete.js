/*
 * File containing logic for delete method of users route
 *
 */

// Dependencies
const _data = require("./../../lib/data");
const _helpers = require("./../../lib/helpers");

// Initializing delete function
const remove = function(data, callback){
  // Validating phone field
  const phone = typeof(data.query.phone)=="string"&&data.query.phone.trim().length==10?data.query.phone.trim():false;
  if(phone){
    // Getting token
    const token = typeof(data.payload.token)=="string"&&data.payload.token.trim().length==20?data.payload.token.trim():false;
    // Checking token validity
    _helpers.verifyToken(token, phone, function(validity){
      if(validity){
        // Checking if file exists
        _data.read(phone, "users", function(err, data){
          if(!err){
            // Delete user file
            _data.delete(phone, "users", function(err){
              if(!err){
                // Deleting user checks
                data.checks.forEach(function(checkId){
                  // Deleting check
                  _data.delete(checkId, "checks", function(err){
                    if(!err){
                      callback(200);
                    }else{
                      callback(500, {"Error":"Unable to delete checks associated with user"});
                    }
                  });
                });
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
        callback(403, {"Error":"Token is not valid or token expired"});
      }
    });
  }else{
    callback(400, {"Error":"Missing specified fields"});
  }
}

// Exporting module
module.exports = remove;
