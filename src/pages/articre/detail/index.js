import React, { Component } from "react";
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
      if (res.code == "200") {
        this.setState({
          content: res.data.blog_content
        });
      }
    });
    fetch("http://localhost:3003/linux%E5%AE%89%E8%A3%85nodejs.md")
      .then(res => res.text())
      .then(text => this.setState({ content: text }));
  }
  render() {
    let { content } = this.state;
    return <Markdown source={content}></Markdown>;
  }
}

export default ArticreDetail;
