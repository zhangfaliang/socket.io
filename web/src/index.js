import { socket } from "./utils/socket";
import toUint8Array from "urlb64touint8array";
import initPage from "./page/index";
import { subscriptionData } from "./services/push";
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
      .register("sw.js")
      .then(registration => {
        console.log("SW registered: ", registration);
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
