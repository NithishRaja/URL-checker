/*
 * File containing logic for not found route
 *
 */

// Initializing not found handler
const notFound = function(data, callback){
  callback(404);
};

// Exporting handler
module.exports = notFound;
