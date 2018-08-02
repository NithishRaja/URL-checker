/*
 * File containing parse function
 *
 */

// parse function
const parse = function(buffer){
  try{
    // Converting JSON to object
    return JSON.parse(buffer);
  }catch(e){
    return {};
  }
};

// Exporting module
module.exports = parse;
