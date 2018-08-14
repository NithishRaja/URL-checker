/*
 * Function to get list of file names
 *
 */

// Dependencies
const fs = require("fs");
const config = require("./../../config");

// Setting base dir
const baseDir = config.dataDir;

// Initializing function
const list = function(dirname, callback){
  // Getting name of all files in directory
  fs.readdir(baseDir+dirname+"/", function(err, data){
    if(!err&&data.length>0){
      var trimmedNames = [];
      // Looping through file names
      data.forEach(function(filename){
        // Trimming file names
        trimmedNames.push(filename.trim().replace(".json", ""));
      });
      callback(false, trimmedNames);
    }else{
      callback(err, data);
    }
  });
};

// Exporting module
module.exports = list;
