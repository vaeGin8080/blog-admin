import axios from "axios";

const service = axios.create({
  baseURL: "/api",
  timeout: 5000
});

service.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.code !== 200) {
      return Promise.reject(new Error("Error"));
    } else {
      return res;
    }
  },
  error => {
    return Promise.reject(error);
  }
);

export default service;
