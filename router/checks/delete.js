/*
 * File containing logic for delete method
 *
 */

// Dependencies
const _data = require("./../../lib/data");
const _helpers = require("./../../lib/helpers");

// Initializing function
const remove = function(data, callback){
  // Getting check id from query string
  const checkId = typeof(data.query.id)=="string"&&data.query.id.trim().length==20?data.query.id.trim():false;
  // Validating check id
  if(checkId){
    // Getting check data
    _data.read(checkId, "checks", function(err, checkData){
      if(!err){
        // Getting token
        const tokenId = typeof(data.headers.token)=="string"&&data.headers.token.trim().length==20?data.headers.token.trim():false;
        // Validating token
        _helpers.verifyToken(tokenId, checkData.userPhone, function(validity){
          if(validity){
            // Getting user data
            _data.read(checkData.userPhone, "users", function(err, userData){
              if(!err){
                // Removing check from list
                userData.checks.splice(checkId, 1);
                // Updating user data
                _data.update(checkData.userPhone, "checks", checkData, function(err){
                  if(!err){
                    // Deleting check file
                    _data.delete(checkId, "checks", function(err){
                      if(!err){
                        callback(200);
                      }else{
                        callback(500, {"Error":"Unable to delete check file"});
                      }
                    });
                  }else{
                    callback(500, {"Error":"Unable to update user"});
                  }
                });
              }else{
                callback(403, {"Error":"Unable to find user associated with check"});
              }
            });
          }else{
            callback(403, {"Error":"Invalid token"});
          }
        });
      }else{
        callback(403, {"Error":"Unable to read check"});
      }
    });
  }else{
    callback(400, {"Error":"Missing required fields"});
  }
};

// Exporting function
module.exports = remove;
