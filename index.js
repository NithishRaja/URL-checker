/*
 * Primary file for API
 *
 */

// Dependencies
const server = require("./lib/server");
const workers = require("./lib/workers");

// Declaring app
var app = {};

// Initializing init function
app.init = function(){
  // Starting server
  server.init();
  // Starting worker
  workers.init();
};

// Starting the app
app.init();

// Exporting the app
module.exports = app;
