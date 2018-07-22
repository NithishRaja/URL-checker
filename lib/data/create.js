/*
 * File containing logic for creating file
 *
 */

// Dependencies
const fs = require("fs");
const path = require("path");

// Setting base dir
const baseDir = path.join(__dirname, "/../../.data/");

// Creating file if none exists
const create = function(fileName, fileDir, data, callback){
  fs.open(baseDir+fileDir+"/"+fileName+".json", "wx", function(err, fileDescriptor){
    if(!err){
      // Converting data to string
      const dataString = JSON.stringify(data);
      // Writing data to file
      fs.writeFile(fileDescriptor, dataString, function(err){
        if(!err){
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
