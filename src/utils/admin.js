import { getSession } from "./session.js";

// 判断是否登陆
export function isLogin() {
  return getSession("isLogin");
}
