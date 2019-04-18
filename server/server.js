// var express = require('express');
// var app = express();
// var http = require("http").Server(app);
// var express = require("express");
// var fs = require("fs");
// var https = require("https");
// var path = require("path")
// var app = express();
// var { initSocket } = require("./socketIoServer.js");

// var options = {
//   key: fs.readFileSync(path.resolve("ssl/server.key")),
//   cert: fs.readFileSync(path.resolve("ssl/server.crt"))
// };
// //在客户端知道服务器不再可用之前，pingTimeout和pingInterval参数将影响延迟。例如，如果由于网络问题而未正确关闭底层TCP连接，则客户端可能必须等待pingTimeoutout pingInterval ms才能获得断开连接事件
// //传输阵列的顺序很重要。默认情况下，首先建立长轮询连接，然后尽可能升级到WebSocket。使用['websocket']意味着如果无法打开WebSocket连接，则不会出现回退。
// app.use("/static", express.static(__dirname + "/asset/public"));
// app.get("/", function(req, res) {
//   res.sendFile(__dirname + "/asset/public/index.html");
// });
// // initSocket(https);
// https.createServer(options, app).listen(3000, function() {
//   console.log(
//     "Example app listening on port 3000! Go to https://localhost:3000/"
//   );
// });

//https://socket.io/get-started/chat/

var express = require("express");
var fs = require("fs");
var app = express();
var https = require("https");
var path = require("path");
var { initSocket } = require("./socketIoServer.js");

var options = {
  key: fs.readFileSync(path.resolve("server/ssl/server.key")),
  cert: fs.readFileSync(path.resolve("server/ssl/server.crt"))
};
app.use("/static", express.static(__dirname + "/asset/public"));
app.get(/\w+\.html/, function(req, res,next) {
  res.sendFile(__dirname + "/asset/public/index.html");
});
app.get(/\w+\.js$/, function(req, res) {
  res.sendFile(__dirname + "/asset/public"+req.originalUrl);
});
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/asset/public/index.html");
});

var server = https.createServer(options, app);
initSocket(server);

server.listen(3000, function() {
  console.log(
    "Example app listening on port 3000! Go to https://localhost:3000/"
  );
});
