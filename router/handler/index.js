/*
 * Container file for handlers
 *
 */

// dependencies
const ping = require("./ping");
const notFound = require("./notFound");
const users = require("./users");
const tokens = require("./tokens");

// Initializing handler container
const handler = {
  ping: ping,
  notFound: notFound,
  users: users,
  tokens: tokens
};

// Exporting container
module.exports = handler;
