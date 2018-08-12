/*
 * File containing logic for post method
 *
 */

// Dependencies
const _data = require("./../../lib/data");

// Initializing function
const post = function(data, callback){
  // Validating payload
  const protocol = typeof(data.payload.protocol)=="string"&&["http","https"].indexOf(data.payload.protocol.trim())>-1?data.payload.protocol.trim():false;
  const method = typeof(data.payload.method)=="string"&&["get","put","post","delete"].indexOf(data.payload.method.trim())>-1?data.payload.method.trim():false;
  const url = typeof(data.payload.url)=="string"&&data.payload.url.trim().length>0?data.payload.url.trim():false;
  const successCodes = typeof(data.payload.successCodes)=="object"&&data.payload.successCodes instanceof Array?data.payload.successCodes:false;
  const timeout = typeof(data.payload.timeout)=="number"&&data.payload.timeout>=1&&data.payload.timeout<=5?data.payload.timeout:false;
  // Continuee only if payload is valid
  if(protocol&&method&&url&&successCodes&&timeout){
    // Getting token
    const token = typeof(data.headers.token)=="string"&&data.headers.token.trim().length==20?data.headers.token.trim():false;
    callback(200);
  }else{
    callback(400, {"Error":"Missing required fields"});
  }
};

// Exporting function
module.exports = post;
