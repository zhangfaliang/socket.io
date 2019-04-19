const webpush = require("web-push");
const { get, isArray } = require("lodash");
const dataSource = [];
const urlParse = require("url").parse;
const proxyOptions = urlParse("http://127.0.0.1:1080");
proxyOptions.rejectUnauthorized = false;

// console.log( webpush.generateVAPIDKeys())
const vapidKeys = {
  publicKey:
    "BCbUy06NAVcRdIofq0n5vio_6bIJ6YGrMIOXnUT_JCFVWYUROB_U6uv1tHXyA_Nonvk3cXOp2JA2Z_wBQjxSLgg",
  privateKey: "3ApzKIw09LKuzYl07JEuXn4c9ZU1jFLuN9IBbCmmPTQ"
};
webpush.setVapidDetails(
  "mailto:alienzhou16@163.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

function pushMessage(subscription, data = {}) {
  console.log(subscription, data, "strart------------------push",{proxy:"http://127.0.0.1:1080"});
  webpush
    .sendNotification(subscription, data, { proxy: "http://127.0.0.1:1080" })
    .then(data => {
      console.log("push service的相应数据:", JSON.stringify(data));
      return;
    })
    .catch(err => {
      // 判断状态码，440和410表示失效
      if (err.statusCode === 410 || err.statusCode === 404) {
        // return util.remove(subscription);
      } else {
        // console.log(subscription);
        console.log(err);
      }
    });
}

const pushRouter = ({ app }) => {
  app.post("/subscription", function(req, res, next) {
    dataSource.push(req.body);
    res.send(JSON.stringify({ message: "ok" }));
  });

  app.post("/pushData", function(req, res, next) {
    const payload = {
      title: "一篇新的文章",
      body: "点开看看吧",
      icon: "/html/app-manifest/logo_512.png",
      data: {
        url: "http://localhost:7000/horseRace/detail/03/39/Newcastle/6/Win"
      }
      //badge: '/html/app-manifest/logo_512.png'
    };
    if (dataSource) {
      const uniqueid = get(req, "body.uniqueid", "");
      let list = uniqueid
        ? dataSource.find(
            item => parseInt(get(item, "uniqueid", "")) === parseInt(uniqueid)
          )
        : dataSource;
      list = list || dataSource;
      if (!isArray(list) && list) list = [list];
      for (let i = 0; i < list.length; i++) {
        let subscription = list[i].subscription;
        pushMessage(subscription, JSON.stringify(payload));
      }
      res.send(JSON.stringify({ message: "ok" }));
    } else {
      res.send(JSON.stringify({ error: "未推送" }));
    }
  });
};

module.exports = pushRouter;
