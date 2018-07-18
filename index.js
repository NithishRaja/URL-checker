// primary file for server

// dependencies
const http = require("http");

// creating server
const server = http.createServer(function(req, res){
  res.end("responding to request!");
});

// listen to port 8000
server.listen(8000, function(){
  console.log("server is listening to port 8000, press ctrl+c to exit");
});
