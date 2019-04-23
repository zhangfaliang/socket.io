import { pushData } from "../../services/push";

const initPage = socket => {
  socket.on("connect", () => {
    // 发起字体请求
    socket.emit("get font", { data: "werwer" }, data => {
      console.log(data); // data will be 'woot'
    });
    // 发起多个字体请求
    socket.emit("ferret", "tobi", "woot", function(data) {
      // args are sent in order to acknowledgement function
      console.log(data); // data will be 'tobi says woot'
    });
    //  监听对话
    socket.on("chat message", function(msg) {
      console.log("socket.id", socket.id);
      console.log("socket.connected", socket.connected);
      console.log("socket.disconnected", socket.disconnected);
      // socket.on("disconnect", () => {
      //   socket.open();
      // });
      const element = document.getElementById("messages");
      const elementLi = document.createElement("li");
      elementLi.innerHTML = msg;
      element.append(elementLi);
    });

    const elementSend = document.getElementById("Send");
    elementSend.onclick = e => {
      e.preventDefault(); // prevents page reloading
      const elementM = document.getElementById("m");
      // 发起对话
      socket.emit("chat message", elementM.value);
      elementM.value = "";
      pushData({ uniqueid: elementM.value });
      return false;
    };
    socket.send('message',"hi");
    socket.on("message", function(msg) {
      console.log(msg,'00000000');
    });
  });

  //在重新连接时，重置transports选项，作为Websocket
  //连接可能失败（由代理，防火墙，浏览器......引起）
  socket.on("reconnect_attempt", () => {
    (socket.io.opts.query = {
      token: "reconnect_attempt"
    }),
      (socket.io.opts.transports = ["polling", "websocket"]);
  });
};

export default initPage;
