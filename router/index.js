/*
 * Container file for handlers
 *
 */

// dependencies
const ping = require("./ping");
const notFound = require("./notFound");
const api = require("./api");
const home = require("./home");

// Initializing handler container
const handler = {
  "": home,
  "ping": ping,
  "notFound": notFound,
  "api/users": api.users,
  "api/tokens": api.tokens,
  "api/checks": api.checks
};

// Exporting container
module.exports = handler;
