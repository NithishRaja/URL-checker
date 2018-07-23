/*
 * File containing logic for deleting file
 *
 */

// Dependencies
const fs = require("fs");
const config = require("./../../config");

// Setting base dir
const baseDir = config.dataDir;

const unlink = function(fileName, fileDir, callback){
  fs.unlink(baseDir+fileDir+"/"+fileName+".json", function(err){
    if(!err){
      callback(false);
    }else{
      callback(err);
    }
  });
};

// Exporting unlink
module.exports = unlink;
