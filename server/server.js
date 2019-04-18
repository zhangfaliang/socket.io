var express = require("express");
var fs = require("fs");
var app = express();
var https = require("https");
var path = require("path");
var { initSocket } = require("./socketIoServer.js");
var { initRouter } = require("./routes/index.js");
var options = {
  key: fs.readFileSync(path.resolve("server/ssl/server.key")),
  cert: fs.readFileSync(path.resolve("server/ssl/server.crt"))
};
initRouter({ app, express,serverDirname:__dirname });
// app.get(/\w+\.html/, function(req, res,next) {
//   res.sendFile(__dirname + "/asset/public/index.html");
// });
// app.get(/\w+\.js$/, function(req, res) {
//   res.sendFile(__dirname + "/asset/public"+req.originalUrl);
// });
// app.get("/", function(req, res) {
//   res.sendFile(__dirname + "/asset/public/index.html");
// });

var server = https.createServer(options, app);
initSocket(server);

server.listen(3000, function() {
  console.log(
    "Example app listening on port 3000! Go to https://localhost:3000/"
  );
});
