/*
 * Container file for fs operations
 *
 */

// Dependencies
const create = require("./create");
const read = require("./read");
const update = require("./update");
const unlink = require("./delete");
const list = require("./list");

// Initializing container
const container= {
  create: create,
  read: read,
  update: update,
  delete: unlink,
  list: list
};

module.exports = container;
