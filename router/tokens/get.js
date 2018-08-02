/*
 * File containing logic for get method
 *
 */

// Initializing function
const get = function(data, callback){
  callback(200, {message: "get"});
};

// Exporting function
module.exports = get;
