/*
 * FIle containing logic for users route
 *
 */

// Dependencies
const get = require("./get");
const put = require("./put");
const post = require("./post");
const remove = require("./delete");

// Initializing method container
const method = {
  get: get,
  put: put,
  post: post,
  delete: remove
};

// Initializing users handler
const users = function(data, callback){
  if(Object.keys(method).indexOf(data.method.toLowerCase())>-1){
    method[data.method.toLowerCase()](data, callback);
  }else{
    callback(405, {"Error": "Method not allowed"});
  }
};

// Exporting module
module.exports = users;
