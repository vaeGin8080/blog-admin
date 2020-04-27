import React from "react";
import SlideItem from "./sideItem/index.js";

const menus = [
  {
    title: "首页",
    icon: "home",
    key: "/home",
  },
  {
    title: "文章列表",
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
