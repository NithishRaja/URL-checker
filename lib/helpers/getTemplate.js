/*
 * Function to get requested html template
 *
 */

// dependencies
const fs = require("fs");
const config = require("./../../config");
const findAndReplace = require("./findAndReplace");

// getTemplate function
const getTemplate = function(templateName, data, callback){
  // Checking templateName and data
  templateName = typeof(templateName)=="string"&&templateName.length>0?templateName:false;
  data = typeof(data)=="object"?data:{};
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
                // Find and replace placeholders with data
                let finalString = findAndReplace(headerString+string+footerString, {});
                callback(false, finalString);
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
