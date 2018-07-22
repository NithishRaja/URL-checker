/*
 * Container file for fs operations
 *
 */

// Dependencies
const create = require("./create");
const read = require("./read");
const update = require("./update");
const unlink = require("./delete");

// Initializing container
const container= {
  create: create,
  read: read,
  update: update,
  delete: unlink
};

module.exports = container;
