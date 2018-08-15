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

// Function to perform the check
workers.performCheck = function(checkData){

};

// Initializing validate function
workers.validateCheckData = function(checkData){
  checkData.protocol = typeof(checkData.protocol)=="string"&&["http","https"].indexOf(checkData.protocol.trim())>-1?checkData.protocol.trim():false;
  checkData.method = typeof(checkData.method)=="string"&&["get","put","post","delete"].indexOf(checkData.method.trim())>-1?checkData.method.trim():false;
  checkData.url = typeof(checkData.url)=="string"&&checkData.url.trim().length>0?checkData.url.trim():false;
  checkData.successCodes = typeof(checkData.successCodes)=="object"&&checkData.successCodes instanceof Array?checkData.successCodes:false;
  checkData.timeout = typeof(checkData.timeout)=="number"&&checkData.timeout>=1&&checkData.timeout<=5?checkData.timeout:false;
  checkData.userPhone = typeof(checkData.userPhone)=="string"&&checkData.userPhone.trim().length==10?checkData.userPhone.trim():false;
  // Set new keys if check is new
  checkData.status = typeof(checkData.status)=="string"&&["up","down"].indexOf(checkData.status.trim())>-1?checkData.status.trim():"down";
  checkData.lastChecked = typeof(checkData.lastChecked)=="number"&&checkData.lastChecked>0?checkData.lastChecked:false;
  // Checking all keys
  if(checkData.protocol&&checkData.method
    &&checkData.url&&checkData.successCodes
    &&checkData.timeout&&checkData.userPhone
    &&checkData.status&&checkData.lastChecked){
      // Perform the check
      workers.performCheck(checkData);
    }else{
      console.log("Error: Check is not formatted properly");
    }
};

// Initializing gather function
workers.gather = function(){
  // Getting list of checks
  _data.list("checks", function(err, checkArray){
    if(!err&&checkArray.length>0){
      // Looping through check array
      checkArray.forEach(function(check){
        // Reading each check
        _data.read(check, "checks", function(err, checkData){
          if(!err){
            // Validate checks
            workers.validateCheckData(checkData);
          }else{
            console.log("Error: Unable to read check");
          }
        });
      });
    }else{
      console.log("Error: Unable to get checks list");
    }
  });
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
