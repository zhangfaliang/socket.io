var express = require('express');
var app = express();
var http = require("http").Server(app);
var { initSocket } = require('./socketIoServer.js')
//在客户端知道服务器不再可用之前，pingTimeout和pingInterval参数将影响延迟。例如，如果由于网络问题而未正确关闭底层TCP连接，则客户端可能必须等待pingTimeoutout pingInterval ms才能获得断开连接事件
//传输阵列的顺序很重要。默认情况下，首先建立长轮询连接，然后尽可能升级到WebSocket。使用['websocket']意味着如果无法打开WebSocket连接，则不会出现回退。
app.use('/static', express.static(__dirname + '/public'));
app.use(express.static('public'));
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});
initSocket(http)
http.listen(3000, function() {
  console.log("listening on *:3000");
});

//https://socket.io/get-started/chat/
