/*
 * File containing function to verify token validity
 *
 */

// Dependencies
const _data = require("./../data");

// Initializing function
const verify = function(phone, tokenId, callback){
  _data.read(tokenId, "tokens", function(err, tokenData){
    if(!err){
      if(tokenId.expires>Date.now()){
        callback(true);
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
