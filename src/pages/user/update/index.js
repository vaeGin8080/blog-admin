import React, { Component } from "react";
import Editor from "for-editor";
import Update from "@/components/Update";
import UpdateFile from "@/components/UpdateFile";
import { Form, Input, Button, message, PageHeader } from "antd";
import { getUserUpdate, getUserInfo } from "@/api/user";

const layout = {
  labelCol: { xs: { span: 24 }, sm: { span: 4 } },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

class ArticreAdd extends Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      headerImg: "",
      id: this.props.match.params.id,
    };
    this.onFinish = this.onFinish.bind(this);
    this.onFinishFailed = this.onFinishFailed.bind(this);
    this.getImgUrl = this.getImgUrl.bind(this);
  }
  componentDidMount() {
    if (this.state.id) {
      this.require();
    }
  }
  require() {
    getUserInfo({
      id: this.state.id,
    }).then((res) => {
      if (res.status === 1) {
        this.formRef &&
          this.formRef.current.setFieldsValue({
            user_name: res.data.user_name,
            job: res.data.job,
            user_compony: res.data.user_compony,
            brief: res.data.brief,
            user_web: res.data.user_web,
            headerImg: res.data.headerImg,
          });
        this.setState({
          headerImg: res.data.headerImg,
        });
      }
    });
  }
  // 提交
  onFinish(data) {
    let { headerImg, id } = this.state;
    let form = {
      user_id: id,
      user_name: data.user_name,
      brief: data.brief,
      user_web: data.user_web,
      user_compony: data.user_compony,
      job: data.job,
      headerImg: headerImg ? headerImg : "",
    };
    getUserUpdate(form).then((res) => {
      if (res.code === "200") {
        message.success(res.msg);
      } else {
        message.error(res.msg);
      }
    });
  }

  onFinishFailed(errorInfo) {
    // console.log("Failed:", errorInfo);
  }
  // 更改头像
  getImgUrl(url) {
    this.setState({
      headerImg: url,
    });
  }

  goBack() {
    this.props.history.goBack();
  }

  render() {
    const { value, id } = this.state;
    return (
      <div>
        <PageHeader
          className="site-page-header"
          onBack={() => this.goBack()}
          title={"编辑"}
        />
        <Form
          {...layout}
          name="basic"
          ref={this.formRef}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
          <Form.Item
            label="用户名"
            name="user_name"
            rules={[{ required: true, message: "请输入用户名" }]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item label="公司" name="user_compony">
            <Input />
          </Form.Item>
          <Form.Item label="简介" name="brief">
            <Input />
          </Form.Item>
          <Form.Item label="个人主页" name="user_web">
            <Input />
          </Form.Item>
          <Form.Item label="头像">
            <Update
              getImgUrl={this.getImgUrl}
              isEdit={id ? true : false}
              img={
                <img
                  src={this.state.headerImg}
                  alt="avatar12"
                  style={{ width: "100%", height: "80px", objectFit: "cover" }}
                />
              }
            ></Update>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              {"更新"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default ArticreAdd;
