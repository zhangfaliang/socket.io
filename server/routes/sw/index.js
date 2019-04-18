const swRouter = ({ app, serverDirname }) => {
  app.get(/\w+\.html/, function(req, res, next) {
    res.sendFile(serverDirname + "/asset/public/index.html");
  });
  app.get(/\w+\.js$/, function(req, res) {
    res.sendFile(serverDirname + "/asset/public" + req.originalUrl);
  });
};
module.exports = {
  swRouter
};
