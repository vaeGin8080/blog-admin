import React from "react";
import { Menu, Slider } from "antd";
import Logo from "../logo";
import { Link, Router } from "react-router-dom";
import { FireOutlined, StarFilled, StarTwoTone } from "@ant-design/icons";

const { SubMenu } = Menu;
class SlideItem extends React.Component {
  rootSubmenuKeys = ["sub1", "sub2", "sub4"];

  state = {
    openKeys: ["sub1"],
  };
  // 菜单展开关闭时触发
  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(
      (key) => this.state.openKeys.indexOf(key) === -1
    );
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };
  renderMenuItem = ({ key, icon, title }) => {
    return (
      <Menu.Item key={key}>
        <Link to={key}>
          <FireOutlined />
          <span>{title}</span>
        </Link>
      </Menu.Item>
    );
  };
  renderSubMenu = ({ key, icon, title, subs }) => {
    return (
      <Menu.SubMenu
        key={key}
        title={
          <span>
            <span>{title}</span>
          </span>
        }
      >
        {subs &&
          subs.map((item) => {
            return item.subs && item.subs.length > 0
              ? this.renderSubMenu(item)
              : this.renderMenuItem(item);
          })}
      </Menu.SubMenu>
    );
  };

  render() {
    return (
      <div>
        <Logo></Logo>
        <Menu
          mode="inline"
          theme="dark"
          onOpenChange={this.onOpenChange}
          style={{ width: 200 }}
        >
          {this.props.menus &&
            this.props.menus.map((item) => {
              return item.subs && item.subs.length > 0
                ? this.renderSubMenu(item)
                : this.renderMenuItem(item);
            })}
        </Menu>
      </div>
    );
  }
}

export default SlideItem;
