/*
 * Function to append logs
 *
 */

// Dependencies
const fs = require("fs");
const config = require("./../../config");

// Setting base dir
const baseDir = config.logDir;

// Append function
const append = function(fileName, string, callback){
  // Append to file. If file does not exist, create a file
  fs.open(baseDir+fileName+".log", "a", function(err, fileDescriptor){
    if(!err){
      fs.appendFile(fileDescriptor, string+"\n", function(err){
        if(!err){
          fs.close(fileDescriptor, function(err){
            if(!err){
              callback(false);
            }else{
              callback("Error: Unable to close file");
            }
          });
        }else{
          callback("Error: Unable to write to file");
        }
      });
    }else{
      callback("Error: Unable to open file");
    }
  });
};

// Exporting module
module.exports = append;
