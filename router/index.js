/*
 * Container file for handlers
 *
 */

// dependencies
const ping = require("./ping");
const notFound = require("./notFound");
const users = require("./users");
const tokens = require("./tokens");
const checks = require("./checks");

// Initializing handler container
const handler = {
  "ping": ping,
  "notFound": notFound,
  "api/users": users,
  "api/tokens": tokens,
  "api/checks": checks
};

// Exporting container
module.exports = handler;
