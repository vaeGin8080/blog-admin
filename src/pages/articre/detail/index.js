import React, { Component } from "react";
import Editor from "for-editor";
import { Row, Col, PageHeader } from "antd";
import { detail } from "@/api";
import "./index.css";
var Markdown = require("react-markdown");

class ArticreDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "# 12",
      id: this.props.match.params.id,
      form: {}
    };
  }
  goBack() {
    this.props.history.goBack();
  }
  componentDidMount() {
    this.require();
  }
  require() {
    detail({
      blog_id: this.state.id
    }).then(res => {
      if (res.code === "200") {
        let form = {
          blog_title: res.data.blog_title,
          blog_author: res.data.blog_author,
          blog_brief: res.data.blog_brief,
          blog_tag: res.data.blog_tag,
          blog_cover: res.data.blog_cover
        };
        this.setState({
          form: form
        });
        if (res.data.blog_content.match(/^http/)) {
          fetch(res.data.blog_content)
            .then(res => res.text())
            .then(text => this.setState({ content: text }));
        } else {
          this.setState({
            content: res.data.blog_content
          });
        }
      }
    });
  }
  render() {
    let { content, form } = this.state;
    return (
      <div>
        <PageHeader
          className="site-page-header"
          onBack={() => this.goBack()}
          title="博客详情"
        />
        <div
          style={{
            background: "white",
            borderRadius: "10px",
            padding: "10px",
            marginBottom: "20px"
          }}
        >
          <Row gutter={[16, 8]}>
            <Col flex="200px" className="label">
              标题:
            </Col>
            <Col flex="auto" className="value">
              {form.blog_title}
            </Col>
          </Row>
          <Row gutter={[16, 8]}>
            <Col flex="200px" className="label">
              作者:
            </Col>
            <Col flex="auto" className="value">
              {form.blog_author}
            </Col>
          </Row>
          <Row gutter={[16, 8]}>
            <Col flex="200px" className="label">
              简介:
            </Col>
            <Col flex="auto" className="value">
              {form.blog_brief}
            </Col>
          </Row>
          <Row gutter={[16, 8]}>
            <Col flex="200px" className="label">
              分类:
            </Col>
            <Col flex="auto" className="value">
              {form.blog_tag}
            </Col>
          </Row>
          <Row gutter={[16, 8]}>
            <Col flex="200px" className="label">
              封面图片:
            </Col>
            <Col flex="auto" className="value">
              <img
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
                src={form.blog_cover}
              />
            </Col>
          </Row>
        </div>
        <Row gutter={[16, 8]} justify="start">
          <Col flex="200px">博客内容:</Col>
        </Row>
        <Editor
          height="1000px"
          value={content}
          onChange={this.handleChange}
          preview={true}
          subfield={false}
          toolbar={{}}
        />
        {/* <Markdown
          source={content}
          escapeHtml={false}
          renderers={{
            code: CodeBlock
          }}
        ></Markdown> */}
      </div>
    );
  }
}

export default ArticreDetail;
