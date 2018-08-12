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
const container = {
  get: get,
  put: put,
  post: post,
  delete: remove
};

// Exporting container
module.exports = container;
