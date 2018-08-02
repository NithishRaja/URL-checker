/*
 * File containing logic for delete method of users route
 *
 */

// Initializing delete function
const remove = function(data, callback){
  callback(200, {message: "delete"});
}

// Exporting module
module.exports = remove;
