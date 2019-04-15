import socket from "../../utils/socket";

const initPage = () => {
  socket.on("chat message", function(msg) {
    const element = document.getElementById("messages");
    const elementLi = document.createElement('li')
    elementLi.innerHTML=msg
    element.append(elementLi);
  });
  const elementForm = document.getElementById("form");
  elementForm.submit(function(e) {
    e.preventDefault(); // prevents page reloading
    const elementM = document.getElementById("m");
    socket.emit("chat message", elementM.innerText);
    elementM.innerText = "";
    return false;
  });
};

export default initPage