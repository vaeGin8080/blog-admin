import request from "@/utils/request.js";

// 查询所有用户文章列表
export function getUserList(query) {
  return request({
    url: "/userList",
    method: "post",
    data: query,
  });
}

// 获取用户信息
export function getUserInfo(data) {
  return request({
    url: "/userInfo",
    method: "post",
    data,
  });
}
