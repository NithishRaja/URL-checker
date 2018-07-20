/*
 * Configuration file
 *
 */

// defining environments container
var environments = {};

// defining development environment
environments.development = {
  port: 8000,
  envName: "development"
};

// defining production environment
environments.production = {
  port: 9000,
  envName: "production"
};

// checking if NODE_ENV was set
var currentEnvironment = typeof(process.env.NODE_ENV) == "string"?process.env.NODE_ENV.toLowerCase():"";

// checking if passed environment exists, else default to development
var environmentToExport = typeof(environments[currentEnvironment]) == "object"?environments[currentEnvironment]:environments.development;

// exporting environment
module.exports = environmentToExport;
