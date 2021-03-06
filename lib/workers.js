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
const util = require("util");
const debug = util.debuglog("workers");
const _data = require("./data");
const _helpers = require("./helpers");
const _logs = require("./logs");

// Worker container
var workers = {};

// Function to write logs to file
workers.log = function(checkData, checkOutcome, state, sendAlert, timeOfCheck){
  // Setting log data into an object
  const logData = {
    'check': checkData,
    'outcome': checkOutcome,
    'state': state,
    'sendAlert': sendAlert,
    'timeOfCheck': timeOfCheck
  };
  // Converting object to string
  const logString = JSON.stringify(logData);
  // Append the string to the file
  const logFileName = checkData.id;
  _logs.append(logFileName, logString, function(err){
    if(!err){
      debug("successfully wrote logs to file");
    }else{
      debug("Failed writing logs to file");
    }
  });
};

// Function to alert user to status change
workers.alertUserToStatusChange = function(checkData){
  // Initializing message to send to user
  const msg = "Alert: "+checkData.method+" "+checkData.protocol+"://"+checkData.url+" is now "+checkData.status;
  // Sending message
  _helpers.sendMessage(checkData.userPhone, msg, function(err){
    if(!err){
      debug("Notification sent successfully", msg);
    }else{
      debug("Falied to send notification to user");
    }
  });
};

// Function to process the check outcome
workers.processCheckOutcome = function(checkData, checkOutcome){
  // Getting state
  const state = !checkOutcome.error&&checkData.successCodes.indexOf(checkOutcome.responseCode)>-1?"up":"down";
  // Deciding if user must be alerted
  const sendAlert = checkData.lastChecked&&checkData.state!==state?true:false;
  // Logging the outcome
  const timeOfCheck = Date.now();
  workers.log(checkData, checkOutcome, state, sendAlert, timeOfCheck);
  // Updating checkData with recent check results
  checkData.state = state;
  checkData.lastChecked = timeOfCheck;
  // Writing to file
  _data.update(checkData.id, "checks", checkData, function(err){
    if(!err){
      if(sendAlert){
        workers.alertUserToStatusChange(checkData);
      }else{
        debug("No change in state");
      }
    }else{
      debug("Error: failed to write check results to file");
    }
  });
};

// Function to perform the check
workers.performCheck = function(checkData){
  // Initializing outcome object
  var checkOutcome = {
    'error':false,
    'responseCode':false
  };
  // Initializing outcome sent flag
  var outcomeSent = false;
  // Parsing url
  const parsedUrl = url.parse(checkData.protocol+"://"+checkData.url);
  // Getting required fields from parsed url
  const hostName = parsedUrl.hostName;
  const path = parsedUrl.path;
  // Setting request details
  const requestDetails = {
    'protocol': checkData.protocol+":",
    'method': checkData.method,
    'hostname': hostName,
    'path': path,
    'timeout': checkData.timeout*1000
  };
  // Choosing appropriate module
  const moduleToUse = checkData.protocol=="http"?http:https;
  const req = moduleToUse.request(requestDetails, function(res){
    // Getting the response status code
    checkOutcome.responseCode = res.statusCode;
    if(!outcomeSent){
      workers.processCheckOutcome(checkData, checkOutcome);
      outcomeSent = true;
    }
  });
  // Binding req to error event
  req.on("error", function(err){
    // Update checkOutcome
    checkOutcome.error = {
      'error': true,
      'value': err
    };
    if(!outcomeSent){
      workers.processCheckOutcome(checkData, checkOutcome);
      outcomeSent = true;
    }
  });
  // Binding req to timeout event
  req.on("timeout", function(err){
    // Update checkOutcome
    checkOutcome.error = {
      'error': true,
      'value': 'timeout'
    };
    if(!outcomeSent){
      workers.processCheckOutcome(checkData, checkOutcome);
      outcomeSent = true;
    }
  });
  // Sending the req
  req.end();
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
      debug("Error: Check is not formatted properly");
    }
};

// Initializing gather function
workers.gather = function(){
  // Getting list of checks
  _data.list("checks", function(err, checkArray){
    if(!err&&checkArray&&checkArray.length>0){
      // Looping through check array
      checkArray.forEach(function(check){
        // Reading each check
        _data.read(check, "checks", function(err, checkData){
          if(!err){
            // Validate checks
            workers.validateCheckData(checkData);
          }else{
            debug("Error: Unable to read check");
          }
        });
      });
    }else{
      debug("Error: Unable to get checks list");
    }
  });
};

// Initializing loop function
workers.loop = function(){
  // Call gather function every 1 sec
  setInterval(function(){
    workers.gather();
  },1000*60);
};

// Initializing rotateLogs function
workers.rotateLogs = function(){
  // Getting a list of log files
  _logs.list(false, function(err, logs){
    if(!err&&logs&&logs.length>0){
      // Looping through log file names
      logs.forEach(function(logFileName){
        const logId = logFileName;
        const newFileName = logId+"-"+Date.now();
        // Compress logs
        _logs.compress(logId, newFileName, function(err){
          if(!err){
            // Truncate log
            _logs.truncate(logId, function(err){
              if(!err){
                debug("Truncating file successful");
              }else{
                debug("Error: Unable to truncate file", err);
              }
            });
          }else{
            callback("Error: Unable to compress file", err);
          }
        });
      });
    }else{
      debug("Error: Unable to get log file names", err);
    }
  });
};

// Initializing logRotationLoop function
workers.logRotationLoop = function(){
  // Call rotateLogs every day
  setInterval(function(){
    workers.rotateLogs();
  },1000*60*60*24);
};

// Initializing init
workers.init = function(){
  console.log("\x1b[33m%s\x1b[0m", "Background workers are running");
  // Calling gather function at init
  workers.gather();
  // Calling loop function to execute checks later
  workers.loop();
  // Calling rotate function at init
  workers.rotateLogs();
  // Calling function to loop rotate logs
  workers.logRotationLoop();
};

// Exporting container
module.exports = workers;
