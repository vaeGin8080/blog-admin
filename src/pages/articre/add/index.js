import React, { Component } from "react";
import Editor from "for-editor";
import Update from "@/components/Update";
import UpdateFile from "@/components/UpdateFile";
import {
  Form,
  Input,
  Button,
  Tabs,
  message,
  PageHeader,
  Select,
  InputNumber,
} from "antd";
import { insert, detail, update } from "@/api";
import "./index.css";

const { TabPane } = Tabs;
const { Option } = Select;
const layout = {
  labelCol: { xs: { span: 24 }, sm: { span: 4 } },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const tag = ["前端", "后端", "其他"];
const tagOption = tag.map((item, index) => {
  return (
    <Option value={item} key={index}>
      {item}
    </Option>
  );
});
class ArticreAdd extends Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      faceImg: "",
      blog_content: "",
      value: "",
      keys: 1,
      id: this.props.match.params.id,
    };
    this.onFinish = this.onFinish.bind(this);
    this.onFinishFailed = this.onFinishFailed.bind(this);
    this.getImgUrl = this.getImgUrl.bind(this);
    this.getUrl = this.getUrl.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    if (this.state.id) {
      this.require();
    }
  }
  require() {
    detail({
      blog_id: this.state.id,
    }).then((res) => {
      if (res.code === "200") {
        this.formRef &&
          this.formRef.current.setFieldsValue({
            blog_title: res.data.blog_title,
            blog_author: res.data.blog_author,
            blog_brief: res.data.blog_brief,
            blog_tag: res.data.blog_tag,
            blog_cover: res.data.blog_cover,
            likeCount: res.data.likeCount,
            commentCount: res.data.commentCount,
          });
        this.state.faceImg = res.data.blog_cover;
        if (res.data.blog_content.match(/^http/)) {
          fetch(res.data.blog_content)
            .then((res) => res.text())
            .then((text) => this.setState({ value: text }));
        } else {
          this.setState({
            value: res.data.blog_content,
          });
        }
      }
    });
  }
  // 提交
  onFinish(data) {
    let { keys, value, blog_content, faceImg, id } = this.state;
    let content = keys === 1 ? value : blog_content;
    if (!content || content === "") {
      message.error("请填写或上传博客内容");
      return;
    }
    let form = {
      blog_id: id,
      blog_title: data.blog_title,
      blog_author: data.blog_author,
      blog_brief: data.blog_brief,
      blog_tag: data.blog_tag,
      likeCount: data.likeCount,
      commentCount: data.commentCount,
      blog_content: content,
      blog_cover: faceImg ? faceImg : "",
    };
    if (!id) {
      insert(form).then((res) => {
        if (res.code === "200") {
          message.success(res.msg);
          this.formRef.current.resetFields();
          this.setState({
            blog_content: "",
            value: "",
            faceImg: "",
          });
        } else {
          message.error(res.msg);
        }
      });
    } else {
      update(form).then((res) => {
        if (res.code === "200") {
          message.success(res.msg);
        } else {
          message.error(res.msg);
        }
      });
    }
  }

  onFinishFailed(errorInfo) {
    // console.log("Failed:", errorInfo);
  }

  handleChange(value) {
    console.log(value);
    this.setState({
      value,
    });
  }

  getImgUrl(url) {
    this.setState({
      faceImg: url,
    });
  }
  getUrl(url) {
    fetch(url)
      .then((res) => res.text())
      .then((text) => this.setState({ blog_content: text }));
  }
  tabChange = (keys) => {
    this.setState({
      keys,
    });
  };
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
          title={!id ? "新增" : "编辑"}
        />
        <Form
          {...layout}
          name="basic"
          ref={this.formRef}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
          <Form.Item
            label="标题"
            name="blog_title"
            rules={[{ required: true, message: "请输入文章标题" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="作者"
            name="blog_author"
            rules={[{ required: true, message: "请输入作者" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="简介"
            name="blog_brief"
            rules={[{ required: true, message: "请输入简介" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="分类"
            name="blog_tag"
            rules={[{ required: true, message: "请选择分类" }]}
          >
            <Select placeholder="请选择分类" allowClear>
              {tagOption}
            </Select>
          </Form.Item>
          {id ? (
            <Form.Item label="点赞数" name="likeCount">
              <InputNumber min={0} />
            </Form.Item>
          ) : (
            ""
          )}
          {id ? (
            <Form.Item label="评论数" name="commentCount">
              <InputNumber min={0} />
            </Form.Item>
          ) : (
            ""
          )}

          <Form.Item label="封面图片">
            <Update
              getImgUrl={this.getImgUrl}
              isEdit={id ? true : false}
              img={
                <img
                  src={this.state.faceImg}
                  alt="avatar12"
                  style={{ width: "100%", height: "80px", objectFit: "cover" }}
                />
              }
            ></Update>
          </Form.Item>
          <Form.Item
            label="文章内容"
            rules={[{ required: true, message: "请上传或填写内容" }]}
          >
            <Tabs
              defaultActiveKey="1"
              tabPosition="right"
              onChange={this.tabChange}
            >
              <TabPane tab="在线编辑" key="1">
                <Editor
                  height="500px"
                  value={value}
                  onChange={this.handleChange}
                  preview={true}
                  subfield={true}
                />
              </TabPane>
              <TabPane tab="直接上传" key="2">
                <UpdateFile getUrl={this.getUrl}></UpdateFile>
              </TabPane>
            </Tabs>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              {!id ? "提交" : "更新"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default ArticreAdd;
