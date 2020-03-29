import React, { Component } from "react";
import Editor from "for-editor";
import Update from "@/components/Update";
import { Form, Input, Button, Checkbox } from "antd";
import { insert } from "@/api";
const layout = {
  labelCol: { xs: { span: 24 }, sm: { span: 4 } },
  wrapperCol: { span: 16 }
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
};
class ArticreAdd extends Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      value: "2",
      faceImg: ""
    };
    this.onFinish = this.onFinish.bind(this);
    this.onFinishFailed = this.onFinishFailed.bind(this);
    this.getImgUrl = this.getImgUrl.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {}
  onFinish(data) {
    console.log("Success:", data);
    let form = {
      blog_title: data.title,
      blog_author: data.author,
      blog_brief: data.brief,
      blog_tag: data.tag,
      blog_content: data.editor,
      blog_cover: this.state.faceImg ? this.state.faceImg : "xxx"
    };
    insert(form).then(res => {});
  }

  onFinishFailed(errorInfo) {
    // console.log("Failed:", errorInfo);
  }

  handleChange(value) {
    console.log(value);
    this.setState({
      value
    });
  }

  getImgUrl(url) {
    this.setState({
      faceImg: url
    });
  }

  render() {
    const { value } = this.state;
    return (
      <div>
        <Form
          {...layout}
          name="basic"
          ref={this.formRef}
          initialValues={{ remember: true }}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: "请输入文章标题" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="作者"
            name="author"
            rules={[{ required: true, message: "请输入作者" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="简介"
            name="brief"
            rules={[{ required: true, message: "请输入简介" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="分类"
            name="tag"
            rules={[{ required: true, message: "请输入分类" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="封面图片" name="faceImg">
            <Update getImgUrl={this.getImgUrl}></Update>
          </Form.Item>
          <Form.Item label="文章内容" name="editor">
            <Editor
              height="500px"
              value={value}
              onChange={this.handleChange}
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
