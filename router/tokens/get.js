/*
 * File containing logic for get method
 *
 */

// Dependencies
const _data = require("./../../lib/data");

// Initializing function
const get = function(data, callback){
  const tokenId = typeof(data.query.tokenId)=="string"&&data.query.tokenId.trim().length==20?data.query.tokenId.trim():false;
  // Checking validity of token id
  if(tokenId){
    // Reading token
    _data.read(tokenId, "tokens", function(err, tokenObject){
      if(!err){
        callback(200, tokenObject);
      }else{
        console.log(err);
        callback({"Error":"Token does not exists"});
      }
    });
  }else{
    callback(400, {"Error":"Missing required fields"});
  }
};

// Exporting function
module.exports = get;
