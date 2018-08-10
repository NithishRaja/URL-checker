/*
 * File containing createRandomString function
 *
 */

// Initializing function
const createRandomString = function(strLen){
  strLen = typeof(strLen)=="number"&&strLen>0?strLen:false;
  // Checking if string length is a number
  if(strLen){
    // Setting characters allowed in random string
    const allowedCharacters = "qwertyuiopasdfghjklzxcvbnm1234567890";
    // Initializing final string to be returned
    var finalString = "";
    // Iterating to create random string of required length
    for(var i=0;i<strLen;++i){
      var randomCharacter = allowedCharacters.charAt(Math.floor(Math.random()*allowedCharacters.length));
      finalString+=randomCharacter;
    }
    // Returning final string
    return finalString;
  }else{
    return false;
  }
};

// Exporting function
module.exports = createRandomString;
