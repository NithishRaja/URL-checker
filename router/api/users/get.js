/*
 * File containing logic for get method of users route
 *
 */

// Dependencies
const _data = require("./../../../lib/data");
const _helpers = require("./../../../lib/helpers");

// Initializing get function
const get = function(data, callback){
  // Checking if file exists
  const phone = typeof(data.query.phone)=="string"&&data.query.phone.trim().length==10?data.query.phone.trim():false;
  if(phone){
    // Getting user token
    const token = typeof(data.headers.token)=="string"&&data.headers.token.trim().length==20?data.headers.token.trim():false;
    // Checking validity of token
    _helpers.verifyToken(token, phone, function(validity){
      if(validity){
        // Reading file
        _data.read(phone,"users",function(err, data){
          if(!err){
            // removing hashedPassword
            delete data.hashedPassword;
            callback(200, data);
          }else{
            callback(500, {"Error":"Unable to read file"});
          }
        });
      }else{
        callback(403, {"Error":"Token has expired or token does not exist"});
      }
    });
  }else{
    callback(404);
  }
}

// Exporting module
module.exports = get;
