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
    // Getting header
    fs.readFile(config.templateDir+"_header.html", "utf8", function(err, headerString){
      if(!err&&headerString){
        // Getting footer
        fs.readFile(config.templateDir+"_footer.html", "utf8", function(err, footerString){
          if(!err&&footerString){
            // Reading from template
            fs.readFile(config.templateDir+templateName+".html", "utf8", function(err, string){
              if(!err&&string){
                callback(false, headerString+string+footerString);
              }else{
                callback("Required template does not exist");
              }
            });
          }else{
            callback("Error while getting footer");
          }
        });
      }else{
        console.log(err);
        callback("Error while getting header");
      }
    });
  }else{
    callback("Valid template name is required");
  }
};

// Exporting function
module.exports = getTemplate;
