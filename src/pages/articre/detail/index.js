import React, { Component } from "react";
import Editor from "for-editor";
import { PageHeader } from "antd";
import { detail } from "@/api";

var Markdown = require("react-markdown");

class ArticreDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "# 12",
      id: this.props.match.params.id
    };
  }
  componentDidMount() {
    this.require();
  }
  require() {
    detail({
      blog_id: this.state.id
    }).then(res => {
      if (res.code === "200") {
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
    let { content } = this.state;
    return (
      <div>
        <PageHeader
          className="site-page-header"
          onBack={() => null}
          title="详情"
        />
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
