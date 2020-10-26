import React from "react";
import SlideItem from "./sideItem/index.js";
import { getSession } from "@/utils/session";
var menus = [
  {
    title: "工作台",
    icon: "home",
    key: "/home",
    meta: ["user"],
  },
  {
    title: "配置",
    icon: "laptop",
    key: "/user",
    meta: ["admin"],
    subs: [{ key: "/user/list", title: "用户管理", icon: "" }],
  },
  {
    title: "全部",
    icon: "laptop",
    key: "/all",
    meta: ["admin"],
    subs: [{ key: "/all/list", title: "文章列表", icon: "" }],
  },
  {
    title: "我的",
    icon: "laptop",
    key: "/articre",
    meta: ["user"],
    subs: [{ key: "/articre/list", title: "文章列表", icon: "" }],
  },
];
console.log("menu");

class Slide extends React.Component {
  render() {
    const uid = getSession("uid");
    menus = menus.filter((item) => {
      return uid == 1
        ? true
        : item.meta && !(item.meta.indexOf("admin") !== -1);
    });
    return <SlideItem menus={menus}></SlideItem>;
  }
}

export default Slide;
