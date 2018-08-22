/*
 * Container file for logging functions
 *
 */

// Dependencies
const append = require("./append");
const list = require("./list");
const compress = require("./compress");
const decompress = require("./decompress");
const truncate = require("./truncate");

// Container object
const logFunctions = {
  'append': append,
  'list': list,
  'compress': compress,
  'decompress': decompress,
  'truncate': truncate
};

// Exporting container
module.exports = logFunctions;
