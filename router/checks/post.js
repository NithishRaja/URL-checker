/*
 * File containing logic for post method
 *
 */

// Dependencies
const _data = require("./../../lib/data");
const _helpers = require("./../../lib/helpers");
const config = require("./../../config");

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
    // Getting token data
    _data.read(token, "tokens", function(err, tokenData){
      if(!err){
        const userPhone = tokenData.phone;
        // Getting user data
        _data.read(userPhone, "users", function(err, userData){
          if(!err){
            // Validating user checks
            const userChecks = typeof(userData.checks)=="object"&&userData.checks instanceof Array?userData.checks:[];
            if(userChecks.length<=config.maxChecks){
              // creating check idea
              const checkId = _helpers.createRandomString(20);
              // Creating check object
              const checkObject = {
                checkId: checkId,
                userPhone: userPhone,
                protocol: protocol,
                method: method,
                url: url,
                successCodes: successCodes,
                timeout: timeout
              };
              // Writing the check object to file
              _data.create(checkId, "checks", checkObject, function(err){
                if(!err){
                  // Update checks array in userData
                  userChecks.push(checkId);
                  userData.checks = userChecks;
                  // Updating user data
                  _data.update(userPhone, "users", userData, function(err){
                    if(!err){
                      callback(200, checkObject);
                    }else{
                      callback(500, {"Error":"Unable to write user data to file"});
                    }
                  });
                }else{
                  callback(500, {"Error":"Unable to write checks to file"});
                }
              });
            }else{
              callback(400, {"Error":"Cannot create more than allowed number of ckecks ("+config.maxChecks+")"});
            }
          }else{
            callback(500, {"Error":"Unable to read user data"});
          }
        });
      }else{
        callback(403, {"Error":"Token does not exist"});
      }
    });
  }else{
    callback(400, {"Error":"Missing required fields"});
  }
};

// Exporting function
module.exports = post;
