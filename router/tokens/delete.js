/*
 * File containing logic for delete method
 *
 */

// Dependencies
const _data = require("./../../lib/data");

// Initializing function
const remove = function(data, callback){
  const tokenId = typeof(data.query.tokenId)=="string"&&data.query.tokenId.trim().length==20?data.query.tokenId.trim():false;
  if(tokenId){
    _data.read(tokenId, "tokens", function(err, tokenData){
      if(!err){
        _data.delete(tokenId, "tokens", function(err){
          if(!err){
            callback(200);
          }else{
            console.log(err);
            callback(500, {"Error":"Unable to delete token"});
          }
        });
      }else{
        console.log(err);
        callback(400, {"Error":"Token does not exist"});
      }
    });
  }else{
    callback(400, {"Error":"Required fields missing"});
  }
};

// Exporting function
module.exports = remove;
