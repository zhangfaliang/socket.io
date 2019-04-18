import { postData } from "../api/request";

export const pushData = (data = {}) => {
  postData("/push", data);
};

export const subscriptionData = (data = {}) => {
  postData("/subscription", data);
};
