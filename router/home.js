/*
 * File containing html for home page
 *
 */

// dependencies
const _helpers = require("./../lib/helpers");
const util = require("util");
const debug = util.debuglog("HOME");

// Function
const home = function(data, callback){
  // Responding with html only if method is GET
  if(data.method=="GET"){
    // Getting template
    _helpers.getTemplate("home", {}, function(err, template){
      if(!err){
        callback(200, template, "html");
      }else{
        debug("Error in reading template 'home'", err);
        callback(500, {"Error":"Page could not be rendered"});
      }
    });
  }else{
    callback(405);
  }
};

// Exporting module
module.exports = home;
