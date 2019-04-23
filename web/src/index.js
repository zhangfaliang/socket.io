import { socket } from "./utils/socket";
import initPage from "./page/index";
import registerPWA from './utils/registerPWA';
initPage(socket);
registerPWA();


