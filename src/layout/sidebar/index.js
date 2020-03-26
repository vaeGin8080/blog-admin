import React from "react";
import SlideItem from "./sideItem/index.js";

const menus = [
  {
    title: "首页",
    icon: "home",
    key: "/home"
  },
  {
    title: "文章列表",
    icon: "laptop",
    key: "/articre",
    subs: [
      { key: "/articre", title: "按钮", icon: "" },
      { key: "/articre2", title: "图标", icon: "" }
    ]
  },
  {
    title: "导航组件",
    icon: "bars",
    key: "/home/navigation",
    subs: [
      { key: "/home/navigation/dropdown", title: "下拉菜单", icon: "" },
      { key: "/home/navigation/menu", title: "导航菜单", icon: "" },
      { key: "/home/navigation/steps", title: "步骤条", icon: "" }
    ]
  },
  {
    title: "输入组件",
    icon: "edit",
    key: "/home/entry",
    subs: [
      {
        key: "/home/entry/form",
        title: "表单",
        icon: "",
        subs: [
          { key: "/home/entry/form/basic-form", title: "基础表单", icon: "" },
          { key: "/home/entry/form/step-form", title: "分步表单", icon: "" }
        ]
      },
      { key: "/home/entry/upload", title: "上传", icon: "" }
    ]
  }
];
class Slide extends React.Component {
  render() {
    return <SlideItem menus={menus}></SlideItem>;
  }
}

export default Slide;
