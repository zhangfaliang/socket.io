const staticRouter = ({ app, express, serverDirname }) => {
  app.use("/static", express.static(serverDirname + "/asset/public"));
};
module.exports = {
  staticRouter
};
