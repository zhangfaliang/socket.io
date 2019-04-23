const adminSocket = io => {
  let timer = 1000,
    timers = null;
  io.on("connection", function(socket) {
    socket.on("ferret", function(name, word, fn) {
      fn(name + " says " + word);
    });

    socket.on("chat message", function(msg) {
      socket.emit("chat message", msg);
      timers = setInterval(() => {
        timer += 1000;
        socket.emit("chat message", timer);
        if (timer > 5000) {
          clearInterval(timers);
        }
      }, 1000);
    });
    socket.emit("chat message", "878");
    socket.on("get font", function(data, callback) {
      callback("ttf");
    });
    socket.on('message', function () {
        socket.send('message');
     });
    socket.on('disconnect', function () { });
    // 添加广播
    socket.broadcast.emit("user connected");
  });
};

module.exports = adminSocket;
