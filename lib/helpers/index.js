/*
 * Container file for helper functions
 *
 */

// Dependencies
const hash = require("./hash");
const parse = require("./parse");
const createRandomString = require("./createRandomString");
const verifyToken = require("./verifyToken");
const sendMessage = require("./sendMessage");

// Initializing container
const helpers = {
  hash: hash,
  parse: parse,
  createRandomString: createRandomString,
  verifyToken: verifyToken,
  sendMessage: sendMessage
};

// Exporting module
module.exports = helpers;
