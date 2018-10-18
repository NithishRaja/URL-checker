/*
 * Configuration file
 *
 */

// Dependencies
const path = require("path");

// defining environments container
var environments = {};

// defining development environment
environments.development = {
  port: 80,
  envName: "development",
  dataDir: path.join(__dirname, "/.data/"),
  logDir: path.join(__dirname, "/.logs/"),
  templateDir: path.join(__dirname, "/.templates/"),
  hashingSecret: "MyHashingSecret",
  maxChecks: 5,
  'twilio' : {
    'accountSid' : 'ACb32d411ad7fe886aac54c665d25e5c5d',
    'authToken' : '9455e3eb3109edc12e3d8c92768f7a67',
    'fromPhone' : '+15005550006'
  }
};

// defining production environment
environments.production = {
  port: 443,
  envName: "production",
  dataDir: path.join(__dirname, "/.data/"),
  logDir: path.join(__dirname, "/.logs/"),
  templateDir: path.join(__dirname, "/.templates/"),
  hashingSecret: "MyProductionHashingSecret",
  maxChecks: 5,
  'twilio' : {
    'accountSid' : '',
    'authToken' : '',
    'fromPhone' : ''
  }
};

// checking if NODE_ENV was set
var currentEnvironment = typeof(process.env.NODE_ENV) == "string"?process.env.NODE_ENV:"";

// checking if passed environment exists, else default to development
var environmentToExport = typeof(environments[currentEnvironment]) == "object"?environments[currentEnvironment]:environments.development;

// exporting environment
module.exports = environmentToExport;
