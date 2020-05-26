import React from "react";
import SlideItem from "./sideItem/index.js";

const menus = [
  {
    title: "工作台",
    icon: "home",
    key: "/home",
  },
  {
    title: "用户",
    icon: "laptop",
    key: "/user",
    subs: [{ key: "/user/list", title: "用户列表", icon: "" }],
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
    subs: [{ key: "/articre/list", title: "文章列表", icon: "" }],
  },
];
class Slide extends React.Component {
  render() {
    return <SlideItem menus={menus}></SlideItem>;
  }
}

export default Slide;
