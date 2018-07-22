/*
 * File containing logic for deleting file
 *
 */

// Dependencies
const fs = require("fs");
const path = require("path");

// Setting base dir
const baseDir = path.join(__dirname, "/../../.data/");

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
