/*
 * File containing worker tasks
 *
 */

// Dependencies
const path = require("path");
const fs = require("fs");
const http = require("http");
const https = require("https");
const url = require("url");
const _data = require("./data");
const _helpers = require("./helpers");

// Worker container
var workers = {};

// Initializing gather function
workers.gather = function(){

};

// Initializing loop function
workers.loop = function(){
  // Call gather function every 1 sec
  setTimeout(function(){
    workers.gather();
  },1000*60);
};

// Initializing init
workers.init = function(){
  // Calling gather function at init
  workers.gather();
  // Calling loop function to execute checks later
  workers.loop();
};

// Exporting container
module.exports = workers;
