/*
 * File containing function to decompress
 *
 */

// Dependencies
const zlib = require("zlib");
const fs = require("fs");
const config = require("./../../config");

// Decompress function
const decompress = function(fileId, callback){
  const fileName = fileId+".gz.b64";
  // Reading file
  fs.readFile(config.logDir+fileName, "utf8", function(err, logString){
    if(!err){
      // Initializing input buffer
      var inputBuffer = Buffer.from(logString, "base64");
      // Decompressing data
      zlib.unzip(inputBuffer, function(err, outputBuffer){
        if(!err){
          const str = outputBuffer.toString();
          callback(false, str);
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
module.exports= decompress;
