/*
 * File containing logic for put method
 *
 */

// Dependencies
const _data = require("./../../../lib/data");

// Initializing function
const put = function(data, callback){
  const tokenId = typeof(data.payload.tokenId) == "string"&&data.payload.tokenId.trim().length==20?data.payload.tokenId.trim():false;
  const extend = typeof(data.payload.extend) == "boolean"&&data.payload.extend?true:false;
  // Checking if payload is valid
  if(tokenId&&extend){
    // Getting token info
    _data.read(tokenId, "tokens", function(err, tokenData){
      if(!err){
        // Checking if token expired
        if(tokenData.expires>Date.now()){
          // Updating token expiration time
          tokenData.expires = Date.now()+1000*60*60;
          // Writing token data to file
          _data.update(tokenId, "tokens", tokenData, function(err){
            if(!err){
              callback(200);
            }else{
              console.log(err);
              callback(500, {"Error":"Unable to update token"});
            }
          });
        }else{
          callback(400, {"Error":"Token has already expired"});
        }
      }else{
        console.log(err);
        callback(400, {"Error":"Invalid token"});
      }
    });
  }else{
    callback(400, {"Error":"Required fields missing"});
  }
};

// Exporting function
module.exports = put;
