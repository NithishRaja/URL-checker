/*
 * File containing logic for put method
 *
 */

// Dependencies
const _data = require("./../../../lib/data");
const _helpers = require("./../../../lib/helpers");

// Initializing function
const put = function(data, callback){
  // Getting check id from payload
  const checkId = typeof(data.payload.id)=="string"&&data.payload.id.trim().length==20?data.payload.id.trim():false;
  // Validating check id
  if(checkId){
    // Getting check data
    _data.read(checkId, "checks", function(err, checkData){
      if(!err){
        // Getting token from header
        const tokenId = typeof(data.headers.token)=="string"&&data.headers.token.trim().length==20?data.headers.token.trim():false;
        // Validating token
        _helpers.verifyToken(tokenId, checkData.userPhone, function(validity){
          if(validity){
            // Getting fields to update
            const protocol = typeof(data.payload.protocol)=="string"&&["http","https"].indexOf(data.payload.protocol.trim())>-1?data.payload.protocol.trim():false;
            const method = typeof(data.payload.method)=="string"&&["get","put","post","delete"].indexOf(data.payload.method.trim())>-1?data.payload.method.trim():false;
            const url = typeof(data.payload.url)=="string"&&data.payload.url.trim().length>0?data.payload.url.trim():false;
            const successCodes = typeof(data.payload.successCodes)=="object"&&data.payload.successCodes instanceof Array?data.payload.successCodes:false;
            const timeout = typeof(data.payload.timeout)=="number"&&data.payload.timeout>=1&&data.payload.timeout<=5?data.payload.timeout:false;
            // Validate and update fields
            if(protocol){
              checkData.protocol = protocol;
            }
            if(method){
              checkData.method = method;
            }
            if(url){
              checkData.url = url;
            }
            if(successCodes){
              checkData.successCodes = successCodes;
            }
            if(timeout){
              checkData.timeout = timeout;
            }
            // Updating check
            _data.update(checkId, "checks", checkData, function(err){
              if(!err){
                callback(200);
              }else{
                callback(500, {"Error":"Unable to update file"});
              }
            });
          }else{
            callback(403);
          }
        });
      }else{
        callback(403);
      }
    });
  }else{
    callback(400, {"Error":"Missing required fields"});
  }
};

// Exporting function
module.exports = put;
