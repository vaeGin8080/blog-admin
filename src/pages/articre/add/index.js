import React, { Component } from "react";
import Editor from "for-editor";
import Update from "@/components/Update";
import { Form, Input, Button, Checkbox } from "antd";
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 }
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
};
class ArticreAdd extends Component {
  constructor() {
    super();
    this.state = {
      value: "2"
    };
    this.onFinish = this.onFinish.bind(this);
    this.onFinishFailed = this.onFinishFailed.bind(this);
  }
  onFinish(value) {
    console.log("Success:", values);
  }

  onFinishFailed(errorInfo) {
    console.log("Failed:", errorInfo);
  }

  handleChange(value) {
    console.log(value);
    this.setState({
      value
    });
  }

  render() {
    const { value } = this.state;
    return (
      <div>
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
          <Form.Item
            label="文章名字"
            name="username"
            rules={[{ required: true, message: "请输入文章标题" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="封面图片"
            name="editor"
            rules={[{ required: true, message: "请上传缩略图" }]}
          >
            <Update></Update>
          </Form.Item>
          <Form.Item label="文章内容" name="editor">
            <Editor
              height="500px"
              value={value}
              onChange={e => this.handleChange(e)}
              preview={true}
              subfield={true}
            />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default ArticreAdd;
