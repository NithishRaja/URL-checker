/*
 * Function to get list of log files
 *
 */

// Dependencies
const config = require("./../../config");
const fs = require("fs");

// List function
const list = function(includeCompressedFiles, callback){
  // Reading file names inside dir
  fs.readdir(config.logDir, function(err, fileNames){
    if(!err&&fileNames&&fileNames.length>0){
      var trimmedFileNames = [];
      // Looping through file names
      fileNames.forEach(function(name){
        // Pushing log file names into trimmedFileNames
        if(name.indexOf(".log")>-1){
          trimmedFileNames.push(name.replace(".log", ""));
        }
        // Pushing compressed file names into trimmedFileNames
        if(name.indexOf(".gz.b64")>-1&&includeCompressedFiles){
          trimmedFileNames.push(name.replace(".gz.b64", ""));
        }
      });
      // Sending trimmedFileNames
      callback(false, trimmedFileNames);
    }else{
      callback(err);
    }
  });
};

// Exporting module
module.exports = list;
