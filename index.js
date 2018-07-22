/*
 * primary file for server
 *
 */

// dependencies
const http = require("http");
const url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;
const config = require("./config");
const _data = require("./lib/data");

// Code for testing data library
// TODO: delete at end of testing
_data.delete("indexx", "folder", function(err, payload){
  if(!err && payload){
    var payloadString = JSON.stringify(payload);
    console.log(payload);
  }else{
    console.log(err);
  }
});

// defining server logic
const ServerLogic = function(req, res){
  // parsing url
  var parsedUrl = url.parse(req.url, true);
  // getting trimmed url
  var trimmedUrl = parsedUrl.pathname.replace(/^\/+|\/+$/g,'');
  // getting request method
  var method = req.method;
  // getting query object
  var query = parsedUrl.query;
  // getting headers
  var headers = req.headers;
  // getting req body
  var decoder = new StringDecoder("utf-8");
  var buffer="";
  // listening to data stream
  req.on("data", function(data){
    buffer+=decoder.write(data);
  });
  // listening to end of data stream
  req.on("end", function(){
    buffer+=decoder.end();

    // getting the route handler
    var selectedHandler = typeof(router[trimmedUrl])!="undefined"?router[trimmedUrl]:handler.notFound;
    // constructing data object to send to handler
    const data = {
      trimmedUrl: trimmedUrl,
      method: method,
      query: query,
      headers: headers,
      payload: buffer
    };
    // routing request to selectedHandler
    selectedHandler(data, function(statusCode,payload){
      // setting default value of 200 for statusCode
      statusCode = typeof(statusCode) == "number"?statusCode:200;
      // setting empty object as default for payload
      payload = typeof(payload) == "object"?payload:{};
      // converting payload from object to string
      const payloadString = JSON.stringify(payload);

      // sending response with status code and payload
      res.setHeader("Content-Type", "application/json");
      res.writeHead(statusCode);
      res.end(payloadString);
      // logging the response
      console.log("response: ", statusCode, payloadString);
    });
  });
}

// creating server
const httpServer = http.createServer(function(req, res){
  ServerLogic(req, res);
});

// listen to port 8000
httpServer.listen(config.port, function(){
  console.log("HTTP server is listening to port "+config.port+" in "+config.envName+" mode, press ctrl+c to exit");
});

// defining handler
var handler = {};

// handler for the route /ping
handler.ping = function(data, callback){
  callback(200);
}

// not found handler for default
handler.notFound = function(data, callback){
  callback(404);
}

// defining router
const router = {
  'ping': handler.ping,
}
