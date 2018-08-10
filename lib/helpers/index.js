/*
 * Container file for helper functions
 *
 */

// Dependencies
const hash = require("./hash");
const parse = require("./parse");
const createRandomString = require("./createRandomString");

// Initializing container
const helpers = {
  hash: hash,
  parse: parse,
  createRandomString: createRandomString
};

// Exporting module
module.exports = helpers;
