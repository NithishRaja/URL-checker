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
const getTemplate = require("./getTemplate");

// Initializing container
const helpers = {
  hash: hash,
  parse: parse,
  createRandomString: createRandomString,
  verifyToken: verifyToken,
  sendMessage: sendMessage,
  getTemplate: getTemplate
};

// Exporting module
module.exports = helpers;
