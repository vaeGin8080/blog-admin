import axios from "axios";
import { getSession } from "@/utils/session";

const service = axios.create({
  baseURL: "https://vaegin.top/blog",
  /* baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3333"
      : "https://vaegin.top/blog", */
  timeout: 50000,
});

service.interceptors.request.use(
  (config) => {
    let uid = getSession("uid");
    config.headers["uid"] = uid || "";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    const res = response.data;
    // if (res.code !== 200) {
    //   return Promise.reject(new Error("Error"));
    // } else {
    //   return res;
    // }
    return res;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;
