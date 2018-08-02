/*
 * File containing logic for delete method
 *
 */

// Initializing function
const remove = function(data, callback){
  callback(200, {message: "delete"});
};

// Exporting function
module.exports = remove;
