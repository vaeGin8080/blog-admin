import React, { Component } from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { getRegister } from "@/api/login";
import "./index.scss";

class RegisterForm extends Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      focusItem: -1,
    };
  }
  onFinish = (values) => {
    console.log(values);
    let obj = {
      user_name: values.name,
      user_password: values.password,
    };
    getRegister(obj).then((res) => {
      console.log(res);
      if (res.code === "200") {
        message.success(res.msg);
        this.formRef.current.resetFields();
        this.props.switchShowBox("login");
      } else {
        message.error(res.msg);
      }
    });
  };
  render() {
    let { focusItem } = this.state;
    let { switchShowBox } = this.props;
    return (
      <Form onFinish={this.onFinish} ref={this.formRef}>
        <div className={this.props.className}>
          <h5>管理员注册</h5>
          <div>
            <Form.Item
              name="name"
              rules={[{ required: true, message: "请输入用户名!" }]}
            >
              <Input
                placeholder="用户名"
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
            <Form.Item
              name="confirm"
              hasFeedback
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "请确认正确密码",
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("您输入的两个密码不匹配");
                  },
                }),
              ]}
            >
              <Input
                placeholder="确认密码"
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
                注册
              </Button>
              <span onClick={() => switchShowBox("login")}>返回登录</span>
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
export default RegisterForm;
