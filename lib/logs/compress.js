/*
 * Function to compress file
 *
 */

// Dependencies
const zlib = require("zlib");
const fs = require("fs");
const config = require("./../../config");

// Function to compress file
const compress = function(logId, newFileName, callback){
  const sourceFile = logId+".log";
  const destFile = newFileName+".gz.b64";
  // Reading source file
  fs.readFile(config.logDir+sourceFile,"utf8",function(err, logString){
    if(!err){
      // Compress the data
      zlib.gzip(logString, function(err, buffer){
        if(!err){
          // Open file
          fs.open(config.logDir+destFile,"wx",function(err, fileDescriptor){
            if(!err){
              // Write compressed data to file
              fs.writeFile(fileDescriptor, buffer.toString("base64"), function(err){
                if(!err){
                  // Close the file
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
        }else{
          callback(err);
        }
      });
    }else{
      callback(err);
    }
  });
};

// Exporting function
module.exports = compress;
