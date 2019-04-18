import { pushData } from "../../services/push";

const initPage = socket => {
  socket.on("chat message", function(msg) {
    const element = document.getElementById("messages");
    const elementLi = document.createElement("li");
    elementLi.innerHTML = msg;
    element.append(elementLi);
    console.log("messages");
  });
  debugger;
  const elementSend = document.getElementById("Send");

  elementSend.onclick = e => {
    e.preventDefault(); // prevents page reloading
    // const elementM = document.getElementById("m");
    // console.log(elementM.innerText, socket);
    // socket.emit("chat message", elementM.value);
    // elementM.value = "";
    pushData();
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
};

export default initPage;
