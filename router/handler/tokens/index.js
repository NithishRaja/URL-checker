/*
 * Container file for tokens path
 *
 */

// Dependencies
const get = require("./get");
const put = require("./put");
const remove = require("./delete");
const post = require("./post");

// Initializing container object
const methods = {
  get: get,
  put: put,
  post: post,
  delete: remove
};

// Initializing tokens handler
const tokens = function(data, callback){
  if(Object.keys(method).indexOf(data.method.toLowerCase())>-1){
    method[data.method.toLowerCase()](data, callback);
  }else{
    callback(405, {"Error": "Method not allowed"});
  }
};

// Exporting container
module.exports = tokens;
