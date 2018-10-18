/*
 * Container file for checks route
 *
 */

// Dependencies
const get = require("./get");
const put = require("./put");
const post = require("./post");
const remove = require("./delete");

// Initializing container
const method = {
  get: get,
  put: put,
  post: post,
  delete: remove
};

const checks = function(data, callback){
  if(Object.keys(method).indexOf(data.method.toLowerCase())>-1){
    method[data.method.toLowerCase()](data, callback);
  }else{
    callback(405, {"Error": "Method not allowed"});
  }
};

// Exporting container
module.exports = checks;
