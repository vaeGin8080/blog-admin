import React, { Component } from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { setSession } from "@/utils/session";
import { getLogin } from "@/api/login";
import md5 from "js-md5";
import "./index.scss";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focusItem: -1,
    };
  }
  onFinish = (values) => {
    console.log("Success:", values);
    let obj = {
      user_name: values.name,
      user_password: md5(values.password),
    };
    getLogin(obj).then((res) => {
      if (res.code === "200") {
        setSession("isLogin", true);
        setSession("uid", res.data);
        message.success(res.msg);
        this.props.history.push("/");
      } else {
        message.error(res.msg);
      }
    });
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  render() {
    let { focusItem } = this.state;
    let { switchShowBox } = this.props;
    return (
      <Form onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}>
        <div className={this.props.className}>
          <h5>管理员登录</h5>
          <div>
            <Form.Item
              name="name"
              rules={[{ required: true, message: "请输入用户名!" }]}
            >
              <Input
                placeholder="用户名"
                autoComplete="off"
                onFocus={() => this.setState({ focusItem: 0 })}
                onBlur={() => this.setState({ focusItem: -1 })}
                prefix={
                  <UserOutlined
                    className="icon"
                    style={focusItem === 0 ? styles.focus : {}}
                  />
                }
              />
            </Form.Item>
            <Form.Item
              name="password"
              hasFeedback
              rules={[
                { required: true, message: "请输入密码!" },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || value.length >= 6) {
                      return Promise.resolve();
                    }
                    return Promise.reject("密码格式有误");
                  },
                }),
              ]}
            >
              <Input
                placeholder="密码"
                type="password"
                onFocus={() => this.setState({ focusItem: 1 })}
                onBlur={() => this.setState({ focusItem: -1 })}
                prefix={
                  <LockOutlined
                    className="icon"
                    style={focusItem === 1 ? styles.focus : {}}
                  />
                }
              />
            </Form.Item>
            <div className="bottom flex justify-between align-center">
              <Button className="loginBtn" shape="round" htmlType="submit">
                登录
              </Button>
              <span onClick={() => switchShowBox("register")}>注册</span>
            </div>
          </div>
        </div>
      </Form>
    );
  }
}
const styles = {
  focus: {
    width: "20px",
    opacity: 1,
  },
};
export default LoginForm;
