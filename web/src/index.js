import { socket } from "./utils/socket";
import "./page/index";

const publicKey = new Uint8Array([0x4, 0x37, 0x77, 0xfe]);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("sw.js")
      .then(registration => {
        console.log("SW registered: ", registration);
        // try {
        //   registration.pushManager.subscribe({
        //     userVisibleOnly: true,
        //   });
        // } catch (error) {
        //   console.log(error, "errorerrorerrorerror");
        // }
      })
      .catch(registrationError => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}

socket.on("chat message", function(msg) {
  const element = document.getElementById("messages");
  const elementLi = document.createElement("li");
  elementLi.innerHTML = msg;
  element.append(elementLi);
  console.log("messages");
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
