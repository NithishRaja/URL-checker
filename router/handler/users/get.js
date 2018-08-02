/*
 * File containing logic for get method of users route
 *
 */

// Initializing get function
const get = function(data, callback){
  callback(200, {message: "get"});
}

// Exporting module
module.exports = get;
