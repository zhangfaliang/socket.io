var express = require("express");
var fs = require("fs");
var app = express();
var https = require("https");
var path = require("path");
var bodyParser = require("body-parser");
var { initSocket } = require("./socketIoServer.js");
var { initRouter } = require("./routes/index.js");
var options = {
  // key: fs.readFileSync('server-key.pem'),
  // cert: fs.readFileSync('server-cert.pem')
  key: fs.readFileSync(path.resolve("server/ssl/server.key")),
  cert: fs.readFileSync(path.resolve("server/ssl/server.crt"))
};
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

initRouter({ app, express, serverDirname: __dirname });
var server = https.createServer(options, app);
initSocket(server);

server.listen(3000, function() {
  console.log(
    "Example app listening on port 3000! Go to https://localhost:3000/"
  );
});
