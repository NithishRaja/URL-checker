/*
 * File containing logic for post method
 *
 */

// Initializing function
const post = function(data, callback){
  callback(200, {message: "post"});
};

// Exporting function
module.exports = post;
