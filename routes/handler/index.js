/*
 * Container file for handlers
 *
 */

// dependencies
const ping = require("./ping");
const notFound = require("./notFound");

// Initializing handler container
const handler = {
  ping: ping,
  notFound:notFound
};

// Exporting container
module.exports = handler;
