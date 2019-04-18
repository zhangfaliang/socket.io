const { staticRouter } = require("./static/index");
const { swRouter } = require("./sw/index.js");
const pushRouter = require("./sw/push");
const initRouter = ({ app, express, serverDirname }) => {
  staticRouter({ app, express, serverDirname });
  swRouter({ app, express, serverDirname });
  pushRouter({ app, express, serverDirname });
  app.get("/", function(req, res) {
    res.sendFile(serverDirname + "/asset/public/index.html");
  });
};

module.exports = {
  initRouter
};
