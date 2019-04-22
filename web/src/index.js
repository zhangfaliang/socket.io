import { socket } from "./utils/socket";
import toUint8Array from "urlb64touint8array";
import initPage from "./page/index";
import { subscriptionData } from "./services/push";
import "./asset/img/57.png";

initPage(socket);

const publicKey =
  "BCbUy06NAVcRdIofq0n5vio_6bIJ6YGrMIOXnUT_JCFVWYUROB_U6uv1tHXyA_Nonvk3cXOp2JA2Z_wBQjxSLgg";
function subscribeUserToPush(registration, publicKey) {
  var subscribeOptions = {
    userVisibleOnly: true,
    applicationServerKey: toUint8Array(publicKey)
  };
  return registration.pushManager
    .subscribe(subscribeOptions)
    .then(function(pushSubscription) {
      console.log(
        "Received PushSubscription: ",
        JSON.stringify(pushSubscription)
      );
      return pushSubscription;
    });
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then(registration => {
        console.log("SW registered: ", registration);

        window.addEventListener("beforeinstallprompt", function(e) {
          // beforeinstallprompt Event fired

          // e.userChoice will return a Promise.
          // For more details read: https://developers.google.com/web/fundamentals/getting-started/primers/promises
          e.userChoice.then(function(choiceResult) {
            console.log(choiceResult.outcome);

            if (choiceResult.outcome == "dismissed") {
              console.log("User cancelled home screen install");
            } else {
              console.log("User added to home screen");
            }
          });
        });
        var deferredPrompt;
        window.addEventListener("beforeinstallprompt", function(e) {
          console.log("beforeinstallprompt Event fired");

          e.preventDefault();
          // Stash the event so it can be triggered later.
          deferredPrompt = e;

          return false;
        });
        window.addEventListener("beforeinstallprompt", function(e) {
          console.log("beforeinstallprompt Event fired");
          e.preventDefault();
          return false;
        });

        return subscribeUserToPush(registration, publicKey);
      })
      .then(function(subscription) {
        var body = { subscription: subscription };
        // 为了方便之后的推送，为每个客户端简单生成一个标识
        body.uniqueid = new Date().getTime();
        console.log("uniqueid", body.uniqueid);
        // 将生成的客户端订阅信息存储在自己的服务器上
        return subscriptionData(body);
      })
      .then(function(res) {
        console.log(res);
      })
      .catch(registrationError => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}
