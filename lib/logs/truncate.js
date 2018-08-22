/*
 * Function to truncate file
 *
 */

// Dependencies
const config = require("./../../config");
const fs = require("fs");

// Truncate function
const truncate = function(logId, callback){
  fs.truncate(config.logDir+logId+".log", 0, function(err){
    if(!err){
      callback(false);
    }else{
      callback(err);
    }
  });
};

// Exporting function
module.exports = truncate;
