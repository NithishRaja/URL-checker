/*
 * Container file for helper functions
 *
 */

// Dependencies
const hash = require("./hash");
const parse = require("./parse");
const createRandomString = require("./createRandomString");
const verifyToken = require("./verifyToken");

// Initializing container
const helpers = {
  hash: hash,
  parse: parse,
  createRandomString: createRandomString,
  verifyToken: verifyToken
};

// Exporting module
module.exports = helpers;
