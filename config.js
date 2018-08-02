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
  hashingSecret: "MyHashingSecret"
};

// defining production environment
environments.production = {
  port: 443,
  envName: "production",
  dataDir: path.join(__dirname, "/.data/"),
  hashingSecret: "MyProductionHashingSecret"
};

// checking if NODE_ENV was set
var currentEnvironment = typeof(process.env.NODE_ENV) == "string"?process.env.NODE_ENV:"";

// checking if passed environment exists, else default to development
var environmentToExport = typeof(environments[currentEnvironment]) == "object"?environments[currentEnvironment]:environments.development;

// exporting environment
module.exports = environmentToExport;
