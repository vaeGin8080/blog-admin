import React from "react";
import { Table, Tag, Button, message } from "antd";
import { getList, remove } from "@/api";
import { Link } from "react-router-dom";
import "./index.css";
const size = "small";

class ArticreList extends React.Component {
  constructor(props) {
    super();
    this.state = {
      list: []
    };
    this.columns = [
      {
        title: "序号",
        dataIndex: "blog_id",
        key: "blogId"
      },
      {
        title: "标题",
        dataIndex: "blog_title",
        key: "blog_title"
      },
      {
        title: "作者",
        dataIndex: "blog_author",
        key: "blog_author"
      },
      {
        title: "简介",
        dataIndex: "blog_brief",
        key: "blog_brief"
      },
      {
        title: "更新时间",
        dataIndex: "create_date",
        key: "create_date"
      },
      {
        title: "分类",
        dataIndex: "blog_tag",
        key: "blog_tag",
        render: (text, record) => (
          <div className="table-actions">
            <Tag color="volcano" key={text}>
              {text}
            </Tag>
          </div>
        )
      },
      {
        title: "操作",
        key: "action",
        render: (text, record) => (
          <div className="table-actions">
            <Button size={size}>编辑</Button>
            <Button
              size={size}
              type="primary"
              danger
              onClick={() => this.handleRemove(text.blog_id)}
            >
              删除
            </Button>
            <Button size={size}>
              <Link to={`/articre/detail/${text.blog_id}`}>查看</Link>
            </Button>
          </div>
        )
      }
    ];
  }
  handleRemove = id => {
    remove({ blog_id: id }).then(res => {
      if (res.code === "200") {
        message.success(res.msg);
        this.require();
      } else {
        message.success(res.msg);
      }
    });
  };

  componentDidMount() {
    this.require();
  }
  require() {
    getList().then(res => {
      this.setState({
        list: res.data
      });
    });
  }
  render() {
    let { list } = this.state;
    return (
      <div>
        <Table
          columns={this.columns}
          dataSource={list}
          rowKey={(record, index) => index}
        />
      </div>
    );
  }
}

export default ArticreList;
