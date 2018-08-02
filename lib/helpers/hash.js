/*
 * File containing hash function
 *
 */

// Dependencies
const crypto = require("crypto");
const config = require("./../../config");

// hash function
const hash = function(str){
  if(typeof(str)=="string"&&str.length>0){
    const hashedString = crypto.createHmac("sha256",config.hashingSecret).update(str).digest("hex");
    return hashedString;
  }
};

// Exporting has function
module.exports = hash;
