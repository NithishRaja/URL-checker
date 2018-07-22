/*
 * FIle containing logic for reading file
 *
 */

// Dependencies
const fs= require("fs");
const path = require("path");

const baseDir = path.join(__dirname, "/../../.data/");

const read = function(fileName, fileDir, callback){
  // Reading file
  fs.readFile(baseDir+fileDir+"/"+fileName+".json", "utf8", function(err, data){
    callback(err, data);
  });
};

module.exports = read;
