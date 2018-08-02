/*
 * File containing logic for post method of users route
 *
 */

// Dependencies
const _data = require("./../../lib/data" );
const _helpers = require("./../../lib/helpers");

// Initializing post function
const post = function(data, callback){
  // Getting payload
  const firstName = typeof(data.payload.firstName) == "string"&&data.payload.firstName.trim().length>0?data.payload.firstName.trim():false;
  const lastName = typeof(data.payload.lastName) == "string"&&data.payload.lastName.trim().length>0?data.payload.lastName.trim():false;
  const phone = typeof(data.payload.phone) == "string"&&data.payload.phone.trim().length==10?data.payload.phone.trim():false;
  const password = typeof(data.payload.password) == "string"&&data.payload.password.trim().length>0?data.payload.password.trim():false;
  const tosAgreement = typeof(data.payload.tosAgreement) == "boolean"&&data.payload.tosAgreement?true:false;
  console.log(data.payload);
  console.log(data.payload.firstName);
  // Checking validity of payload
  if(firstName&&lastName&&phone&&password&&tosAgreement){
    _data.read(phone, "users", function(err, data){
      if(err){
        // Getting hashed password
        const hashedPassword = _helpers.hash(password);
        // Checking if password is hashed
        if(hashedPassword){
          // Creating container for user info
          const userObject = {
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            hashedPassword: hashedPassword,
            tosAgreement: true
          };
          // Writing user details to file
          _data.create(phone,"users",userObject,function(err){
            if(!err){
              callback(200);
            }else{
              console.log(err);
              callback(500, {"Error":"Unable to create new user"});
            }
          });
        }else{
          callback(500, {"Error":"Unable to hash password"});
        }
        callback(200, {message: "post"});
      }else{
        // Returning error if user already exists
        callback(400, {"Error":"User already exists"});
      }
    });
  }else{
    // Returning error
    callback(400, {"Error": "Missing required fields"});
  }
}

// Exporting module
module.exports = post;
