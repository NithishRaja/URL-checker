/*
 * File containing logic for put method of users route
 *
 */

// Dependencies
const _data = require("./../../lib/data");
const _helpers = require("./../../lib/helpers");

// Initializing put function
const put = function(data, callback){
  // Checking phone field validity
  const phone = typeof(data.payload.phone)=="string"&&data.payload.phone.trim().length==10?data.payload.phone.trim():false;
  if(phone){
    // Getting user token
    const token = typeof(data.headers.token)=="string"&&data.headers.token.trim().length==20?data.headers.token.trim():false;
    // Checking valiity of token
    _helpers.verifyToken(token, phone, function(validity){
      if(validity){
        // Checking optional details
        const firstName = typeof(data.payload.firstName)=="string"&&data.payload.firstName.trim().length>0?data.payload.firstName.trim():false;
        const lastName = typeof(data.payload.lastName)=="string"&&data.payload.lastName.trim().length>0?data.payload.lastName.trim():false;
        const password = typeof(data.payload.password)=="string"&&data.payload.password.trim().length>0?data.payload.password.trim():false;
        // Reading from file
        _data.read(phone, "users", function(err,userData){
          if(!err){
            // Updating user data
            if(firstName){
              userData.firstName = firstName;
            }
            if(lastName){
              userData.lastName = lastName;
            }
            if(password){
              userData.hashedPassword = _helpers.hash(password);
            }
            // Writing updates to file
            _data.update(phone, "users", userData, function(err){
              console.log(userData);
              if(!err){
                callback(200);
              }else{
                console.log(err);
                callback(500, {"Error":"Unable to update file"});
              }
            });
          }else{
            console.log(err);
            callback(500, {"Error":"Unable to access file"});
          }
        });
      }else{
        callback(403, {"Error":"Token is not valid or token expired"});
      }
    });
  }else{
    callback(400, {"Error": "Missing fields"});
  }
}

// Exporting module
module.exports = put;
