import { postData } from "../api/request";

export const pushData = (data = {}) => {
  postData("/pushData", data);
};

export const subscriptionData = (data = {}) => {
  postData("/subscription", data);
};
