import request from "@/utils/request.js";

// 查询所有用户文章列表
export function getAllList(query) {
  return request({
    url: "/weblist",
    method: "post",
    data: query,
  });
}

// 查询当前用户文章列表
export function getList(query) {
  return request({
    url: "/list",
    method: "get",
    params: query,
  });
}

// 新增、

export function insert(query) {
  return request({
    url: "/insert",
    method: "post",
    data: query,
  });
}

// 删除

export function remove(query) {
  return request({
    url: "/delete",
    method: "get",
    params: query,
  });
}

// 修改

export function update(query) {
  return request({
    url: "/update",
    method: "post",
    data: query,
  });
}

// 详情
export function detail(query) {
  return request({
    url: "/detail",
    method: "get",
    params: query,
  });
}

// 获取凭证

export function getToken(query) {
  return request({
    url: "/token",
    method: "get",
    params: query,
  });
}

// 上传

export function upload(query) {
  return request({
    url: "https://upload-z0.qiniup.com/",
    method: "post",
    headers: { "Content-Type": "multipart/form-data" },
    data: query,
  });
}
