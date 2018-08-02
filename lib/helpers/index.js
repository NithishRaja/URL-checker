/*
 * Container file for helper functions
 *
 */

// Dependencies
const hash = require("./hash");
const parse = require("./parse");

// Initializing container
const helpers = {
  hash: hash,
  parse: parse
};

// Exporting module
module.exports = helpers;
