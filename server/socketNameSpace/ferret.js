const ferretSocket = io => {
    var ferret = io.of("/ferret").on("connection", function(socket) {
        ferret.emit("item", { ferret: "item" });
      });
  };
  
  module.exports = ferretSocket;
  