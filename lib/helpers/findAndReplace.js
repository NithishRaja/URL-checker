/*
 * Function to find and replace placeholders in html templates
 *
 */

// dependencies
const config = require("./../../config");

// Function
const findAndReplace = function(string, data){
  // Checking string
  string = typeof(string)=="string"&&string.length>0?string:false;
  if(string){
    // Saving global values in data object
    Object.keys(config.global).forEach(function(key){
      data["global."+key]=config.global[key];
    });
    // Looping through data object
    Object.keys(data).forEach(function(key){
      // Checking if data value is a string
      if(typeof(data[key])=="string"){
        let find = "{"+key+"}";
        let replace = data[key];
        string = string.replace(find, replace);
      }
    });
    // Returning string
    return string;
  }else{
    return false;
  }
};

// Exporting function
module.exports = findAndReplace;
