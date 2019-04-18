const webpush = require("web-push");
const dataScurce = []
// console.log( webpush.generateVAPIDKeys())
const vapidKeys = {
  publicKey:
    "BCbUy06NAVcRdIofq0n5vio_6bIJ6YGrMIOXnUT_JCFVWYUROB_U6uv1tHXyA_Nonvk3cXOp2JA2Z_wBQjxSLgg",
  privateKey: "3ApzKIw09LKuzYl07JEuXn4c9ZU1jFLuN9IBbCmmPTQ"
};
webpush.setVapidDetails(
  "mailto:985324428@qq.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

function pushMessage(subscription, data = {}) {
  webpush
    .sendNotification(subscription, data, options)
    .then(data => {
      console.log("push service的相应数据:", JSON.stringify(data));
      return;
    })
    .catch(err => {
      // 判断状态码，440和410表示失效
      if (err.statusCode === 410 || err.statusCode === 404) {
        // return util.remove(subscription);
      } else {
        console.log(subscription);
        console.log(err);
      }
    });
}

const pushRouter = ({ app }) => {
  app.post("/subscription", function(req, res, next) {
  
    dataScurce.push(req.body);
    
  });

  app.post("/push", function(req, res, next) {
    const payload = {
      title: "一篇新的文章",
      body: "点开看看吧",
      icon: "/html/app-manifest/logo_512.png",
      data: {
        url: "http://localhost:7000/horseRace/detail/03/39/Newcastle/6/Win"
      }
      //badge: '/html/app-manifest/logo_512.png'
    };
    console.log(dataScurce, "=111111111");
    if (dataScurce) {
      for (let i = 0; i < dataScurce; i++) {
        let subscription = dataScurce[i].subscription;
        pushMessage(subscription, JSON.stringify(payload));
        console.log(dataScurce, "next  -------push");
      }
    }

    next();
  });
};

module.exports = pushRouter;
