// primary file for server

// dependencies
const http = require("http");
const url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;

// creating server
const server = http.createServer(function(req, res){
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
    // logging req body
    console.log(buffer);
    // sending response
    res.end("responding to request!");
  });
});

// listen to port 8000
server.listen(8000, function(){
  console.log("server is listening to port 8000, press ctrl+c to exit");
});
