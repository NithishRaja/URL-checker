/*
 * File containing logic for post method
 *
 */

// Dependencies
const _data = require("./../../../lib/data");
const _helpers = require("./../../../lib/helpers");

// Initializing function
const post = function(data, callback){
  const phone = typeof(data.payload.phone) =="string"&&data.payload.phone.trim().length==10?data.payload.phone.trim():false;
  const password = typeof(data.payload.password)=="string"&&data.payload.password.trim().length>0?data.payload.password.trim():false;
  // Checking if payload containes required data
  if(phone && password){
    _data.read(phone, "users", function(err, dataObject){
      if(!err){
        // Hashing the password sent by user
        const hashedPassword = _helpers.hash(password);
        // Checking if hashed password matches with existing password
        if(hashedPassword==dataObject.hashedPassword){
          // Creating token Id
          const tokenId = _helpers.createRandomString(20);
          // Creating token object
          const tokenObject = {
            "tokenId": tokenId,
            "phone": phone,
            "expires": Date.now()+1000*60*60
          };
          // Storing the token
          _data.create(tokenId, "tokens", tokenObject, function(err){
            if(!err){
              callback(200, tokenObject);
            }else{
              console.log(err);
              callback(500, {"Error":"Unable to create token"});
            }
          });
        }else{
          callback(400, {"Error":"Password does not match"});
        }
      }else{
        console.log(err);
        callback(400, {"Error":"User does not exist"});
      }
    });
  }else{
    callback(400, {"Error":"required fields not filled"});
  }
};

// Exporting function
module.exports = post;
