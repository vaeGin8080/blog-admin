import React, { Component } from "react";
import { Row, Col, Avatar, Menu, Dropdown, message } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import { removeAll } from "@/utils/session";

class Head extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onClick = (key) => {
    console.log(key);
    removeAll();
    message.error("退出登录");
    this.props.history.push("/login");
  };
  render() {
    const user = "Vae";
    const color = "#f56a00";
    const menu = (
      <Menu onClick={this.onClick}>
        <Menu.Item key="1">退出登录</Menu.Item>
      </Menu>
    );
    return (
      <div style={{ height: "64px" }}>
        <Row justify="end" style={{ height: "64px" }}>
          <Col className="flex-center">
            <Dropdown overlay={menu}>
              <div className="flex-center">
                <Avatar
                  style={{ backgroundColor: color, verticalAlign: "middle" }}
                  size="large"
                >
                  {user}
                </Avatar>
                <CaretDownOutlined
                  style={{
                    marginLeft: "5px",
                    fontSize: "18px",
                    color: "white",
                  }}
                />
              </div>
            </Dropdown>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Head;
