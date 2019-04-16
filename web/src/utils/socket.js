import io from "socket.io-client";
import parser from "socket.io-msgpack-parser";

const socket = io('http://localhost:3000/',{
  // parser,
  path: '/myownpath',
  query: {
    token: "cde" // 参数携带
  },
  transportOptions: {
    polling: {
      extraHeaders: {
        "x-clientid": "abc" // 自定义header 头
      }
    }
  },
 transports: ["websocket"] //传输升级
});
  socket.on("chat message", function(msg) {
    const element = document.getElementById("messages");
    const elementLi = document.createElement("li");
    elementLi.innerHTML = msg;
    element.append(elementLi);
    console.log('messages');

  });
  const elementSend = document.getElementById("Send");

  elementSend.onclick = e => {
    e.preventDefault(); // prevents page reloading
    const elementM = document.getElementById("m");
    console.log(elementM.innerText, socket);
    socket.emit("chat message", elementM.value);
    elementM.value = "";
    return false;
  };
//在重新连接时，重置transports选项，作为Websocket
//连接可能失败（由代理，防火墙，浏览器......引起）
socket.on("reconnect_attempt", () => {
  (socket.io.opts.query = {
    token: "reconnect_attempt"
  }),
    (socket.io.opts.transports = ["polling", "websocket"]);
});

if (process.env.NODE_ENV !== "production") {
  console.log("Looks like we are in development mode!");
}
export { socket };
