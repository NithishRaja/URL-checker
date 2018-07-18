// primary file for server

// dependencies
const http = require("http");
const url = require("url");

// creating server
const server = http.createServer(function(req, res){
  // printing req object to console
  var parsedUrl = url.parse(req.url, true);
  var trimmedUrl = parsedUrl.pathname.replace(/^\/+|\/+$/g,'');
  var method = req.method;
  console.log(trimmedUrl+" "+method);
  // sending response
  res.end("responding to request!");
});

// listen to port 8000
server.listen(8000, function(){
  console.log("server is listening to port 8000, press ctrl+c to exit");
});
