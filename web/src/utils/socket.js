import io from "socket.io-client";
import parser from "socket.io-msgpack-parser";

const socket = io('https://localhost:3000/',{
  // parser,
  path: '/myownpath',
  query: {
    token: "cde" // 参数携带
  },
  transportOptions: {
    polling: {
      extraHeaders: {
        "x-clientid": "abc" // 自定义header 头
      }
    }
  },
 transports: ["websocket"] //传输升级
});

if (process.env.NODE_ENV !== "production") {
  console.log("Looks like we are in development mode!");
}
export { socket };
