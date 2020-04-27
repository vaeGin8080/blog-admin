import request from "@/utils/request.js";

// 注册
export function getRegister(query) {
  return request({
    url: "/register",
    method: "post",
    data: query
  });
}

// 登陆
export function getLogin(query) {
  return request({
    url: "/login",
    method: "post",
    data: query
  });
}
