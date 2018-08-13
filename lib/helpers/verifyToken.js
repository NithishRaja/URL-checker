/*
 * File containing function to verify token validity
 *
 */

// Dependencies
const _data = require("./../data");

// Initializing function
const verify = function(phone, tokenId, callback){
  // Reading tokn
  _data.read(tokenId, "tokens", function(err, tokenData){
    if(!err){
      // Checking if token was created by the active user
      if(tokenData.phone==phone){
        // Checking if token has expired
        if(tokenId.expires>Date.now()){
          callback(true);
        }else{
          callback(false);
        }
      }else{
        callback(false);
      }
    }else{
      callback(false);
    }
  });
};

// Exporting function
module.exports = verify;
