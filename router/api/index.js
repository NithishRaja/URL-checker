/*
 * Container file for API routes
 *
 */

// dependencies
const checks = require("./checks");
const users = require("./users");
const tokens = require("./tokens");

// Initializing container
const container = {
  "checks": checks,
  "users": users,
  "tokens": tokens
};

// Exporting container
module.exports = container;
