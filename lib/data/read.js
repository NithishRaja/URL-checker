/*
 * FIle containing logic for reading file
 *
 */

// Dependencies
const fs= require("fs");
const _helpers = require("./../helpers");
const config = require("./../../config");

// Setting base dir
const baseDir = config.dataDir;

const read = function(fileName, fileDir, callback){
  // Reading file
  fs.readFile(baseDir+fileDir+"/"+fileName+".json", "utf8", function(err, data){
    if(!err){
      callback(false, _helpers.parse(data));
    }else{
      callback(err, data);
    }
  });
};

module.exports = read;
