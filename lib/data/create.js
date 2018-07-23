/*
 * File containing logic for creating file
 *
 */

// Dependencies
const fs = require("fs");
const config = require("./../../config");

// Setting base dir
const baseDir = config.dataDir;

// Creating file if none exists
const create = function(fileName, fileDir, data, callback){
  // Open file
  fs.open(baseDir+fileDir+"/"+fileName+".json", "wx", function(err, fileDescriptor){
    if(!err){
      // Converting data to string
      const dataString = JSON.stringify(data);
      // Writing data to file
      fs.writeFile(fileDescriptor, dataString, function(err){
        if(!err){
          // Closing file
          fs.close(fileDescriptor, function(err){
            if(!err){
              callback(false);
            }else{
              callback(err);
            }
          });
        }else{
          callback(err);
        }
      });
    }else{
      callback(err);
    }
  });
};

// Exporting create function
module.exports = create;
