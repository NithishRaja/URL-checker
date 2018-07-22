/*
 * File containing logic for updating file
 *
 */

// Dependencies
const fs = require("fs");
const path = require("path");

// Setting base dir
const baseDir = path.join(__dirname, "/../../.data/");

const update = function(fileName, fileDir, data, callback){
  // Open file
  fs.open(baseDir+fileDir+"/"+fileName+".json","r+",function(err, fileDescriptor){
    // Truncating file
    fs.truncate(fileDescriptor, function(err){
      if(!err){
        // Converting data to string
        const dataString = JSON.stringify(data);
        // Writing to file
        fs.writeFile(fileDescriptor, dataString, function(err){
          if(!err){
            // closing file
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
  });
};

// Exporting update
module.exports = update;
