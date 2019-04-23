const newsSocket = io => {
    var news = io.of("/news").on("connection", function(socket) {
        news.emit("item", { news: "item" });
      });
  };
  
  module.exports = newsSocket;
  