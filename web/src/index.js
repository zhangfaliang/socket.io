import socket from "./utils/socket";

if (module.hot) {
  module.hot.accept("./index.js", function() {
    console.log("Accepting the updated index module!");
  });
}
export default socket;
