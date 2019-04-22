const swRouter = ({ app, serverDirname }) => {
  app.get(/\w+\.html/, function(req, res, next) {
    res.sendFile(serverDirname + "/asset/public/index.html");
  });
  app.get(/\w+\.js$/, function(req, res) {
    res.sendFile(serverDirname + "/asset/public" + req.originalUrl);
  });
  app.get(/\w+\.png$/, function(req, res) {
    console.log("/asset/public" + req.originalUrl)
    res.sendFile(serverDirname + "/asset/public/img/57.png");
  });
};
module.exports = {
  swRouter
};
