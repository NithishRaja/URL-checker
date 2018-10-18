/*
 * Function to get requested html template
 *
 */

// dependencies
const fs = require("fs");
const config = require("./../../config");

// getTemplate function
const getTemplate = function(templateName, callback){
  // Checking templateName
  templateName = typeof(templateName)=="string"&&templateName.length>0?templateName:false;
  if(templateName){
    // Reading from template
    fs.readFile(config.templateDir+templateName+".html", "utf8", function(err, string){
      if(!err&&string){
        callback(false, string);
      }else{
        callback("Required template does not exist");
      }
    });
  }else{
    callback("Valid template name is required");
  }
};

// Exporting function
module.exports = getTemplate;
