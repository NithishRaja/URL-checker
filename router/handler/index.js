/*
 * Container file for handlers
 *
 */

// dependencies
const ping = require("./ping");
const notFound = require("./notFound");
const users = require("./users");

// Initializing handler container
const handler = {
  ping: ping,
  notFound: notFound,
  users: users
};

// Exporting container
module.exports = handler;
