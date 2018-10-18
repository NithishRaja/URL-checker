/*
 * File containing logic for get method
 *
 */

// Dependencies
const _data = require("./../../../lib/data");
const _helpers = require("./../../../lib/helpers");

// Initializing function
const get = function(data, callback){
  // Getting check id from query
  const checkId = typeof(data.query.id)=="string"&&data.query.id.trim().length==20?data.query.id.trim():false;
  // Checking id
  if(checkId){
    // Getting check data
    _data.read(checkId, "checks", function(err, checkData){
      if(!err){
        // Getting token
        const tokenId = typeof(data.headers.token)=="string"&&data.headers.token.trim().length==20?data.headers.token.trim():false;
        // Validating token
        _helpers.verifyToken(tokenId, checkData.userPhone, function(validity){
          if(validity){
            callback(200, checkData);
          }else{
            callback(403);
          }
        });
      }else{
        callback(404);
      }
    });
  }else{
    callback(403, {"Error":"Missing required fields"});
  }
};

// Exporting function
module.exports = get;
