//var io = require("socket.io")();
// http, {
// path: '/test',//要捕获的路径的名称
// serveClient: true //是否提供客户端文件
// adapter:'',//要使用的适配器。默认为随socket.io一起提供的适配器实例，该实例是基于内存的。请参阅socket.io-adapter
//origins:"*",//	the allowed origins
// below are engine.IO options
//parser:'-',//要使用的解析器。默认为随socket.io一起提供的Parser实例。请参阅socket.io-parser。
//pingTimeout:5000,//没有乒乓包的多少ms考虑连接关闭
//   pingInterval: 100, //发送新的ping数据包前多少毫秒
//   pingTimeout: 5000, //没有乒乓包的多少ms考虑连接关闭
//   upgradeTimeout: 25000, //取消未完成的传输升级之前的毫秒数
//   maxHttpBufferSize: 10e7, //在关闭会话之前，消息可以是多少字节或字符（以避免DoS）。
//   allowRequest:()=>{},//接收给定握手或升级请求作为其第一个参数的函数，可以决定是否继续。第二个参数是需要使用已决定的信息调用的函数：fn（错误，成功），其中success是布尔值，其中false表示请求被拒绝，而err是错误代码。
//   transports: ["polling", "websocket"], //传输以允许连接
//   allowUpgrades: true, //是否允许运输升级
//   httpCompression: true, //轮询传输的http压缩参数（请参阅zlib api docs）。设置为false以禁用。
//   cookie: true, //包含要作为握手响应标头的一部分发送的客户端sid的HTTP cookie的名称。设置为false以不发送一个。
//   cookie: io,
//   cookiePath: "/", //上述cookie选项的路径。如果为false，则不会发送路径，这意味着浏览器只会在engine.io附加路径（/engine.io）上发送cookie。将false设置为不在所有请求上保存io cookie。
//   cookieHttpOnly: true, //if true HttpOnly io cookie无法通过客户端API访问，例如JavaScript。如果cookie或cookiePath设置为false，则此选项无效。
//   wsEngine: ws //使用什么WebSocket服务器实现。指定的模块必须符合ws接口（请参阅ws module api docs）。默认值是ws。通过安装uws模块也可以使用替代的c ++插件。
// }
var io = require("socket.io")();
const parser = require('socket.io-msgpack-parser'); // or require('socket.io-json-parser')

let timer = 1000,
  timers = null;
const initSocket = (server, initProp = {}) => {
  io.attach(server, {
    path: '/myownpath',
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false,
    parser: parser
  });
  //通过其路径名标识符nsp初始化并检索给定的Namespace。如果命名空间已初始化，则立即返回它。
  //   io.origins((origin, callback) => {
  //       console.log(origin !== 'http://192.168.0.188:3000/')
  //     if (origin !== 'http://192.168.0.188:3000/') {
  //       return callback('origin not allowed', false);
  //     }
  //     return callback(null, true);
  //   });
  // server-side
  
  io.use((socket, next) => {
    let token = socket.handshake.query.token;
    let clientId = socket.handshake.headers["x-clientid"];

    console.log(token, clientId);
    return next();
    // return next(new Error('authentication error'));
  });

  let custom_id = 0;
  //覆盖默认方法以生成自定义套接字ID。 使用节点请求对象（http.IncomingMessage）作为第一个参数调用该函数。
  io.engine.generateId = req => {
    return "custom:id:" + custom_id++; // custom id must be unique
  };
  io.on("connection", function(socket) {
    socket.on("chat message", function(msg) {
      io.emit("chat message", msg);
      timers = setInterval(() => {
        timer += 1000;
        io.emit("chat message", timer);
        if (timer > 5000) {
          clearInterval(timers);
        }
      }, 1000);
    });
  });
};

module.exports = {
  initSocket
};
