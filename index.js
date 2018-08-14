/*
 * Primary file for API
 *
 */

// Dependencies
const server = require("./lib/server");

// Declaring app
var app = {};

// Initializing init function
app.init = function(){
  // Starting server
  server.init();
};

// Starting the app
app.init();

// Exporting the app
module.exports = app;
