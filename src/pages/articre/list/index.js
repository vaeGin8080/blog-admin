import React from "react";
import { Table, Tag, Button, message, Input, Row, Col } from "antd";
import { getList, remove } from "@/api";
import { Link } from "react-router-dom";
import { parseTime } from "@/utils/utils";
import "./index.scss";
const size = "default";
const { Search } = Input;
class ArticreList extends React.Component {
  constructor(props) {
    super();
    this.state = {
      list: [],
      loading: false,
    };
    this.columns = [
      {
        title: "序号",
        dataIndex: "blog_id",
        key: "blogId",
      },
      {
        title: "标题",
        dataIndex: "blog_title",
        key: "blog_title",
      },
      {
        title: "作者",
        dataIndex: "blog_author",
        key: "blog_author",
      },
      {
        title: "简介",
        dataIndex: "blog_brief",
        key: "blog_brief",
      },
      {
        title: "更新时间",
        dataIndex: "create_date",
        key: "create_date",
        render: (text, record) => (
          <div className="table-actions">
            {parseTime(text, "{y}-{m}-{d} {h}:{i}:{s}")}
          </div>
        ),
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
        ),
      },
      {
        title: "操作",
        key: "action",
        render: (text, record) => (
          <div className="table-actions">
            <Button size={size} type="primary">
              <Link to={`/articre/add/${text.blog_id}`}>编辑</Link>
            </Button>
            <Button
              size={size}
              type="primary"
              danger
              onClick={() => this.handleRemove(text.blog_id)}
            >
              删除
            </Button>
            <Button
              size={size}
              style={{ background: "#67c23a", color: "white" }}
            >
              <Link to={`/articre/detail/${text.blog_id}`}>查看</Link>
            </Button>
          </div>
        ),
      },
    ];
  }
  handleRemove = (id) => {
    remove({ blog_id: id }).then((res) => {
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
    this.setState({
      loading: true,
    });
    getList().then((res) => {
      this.setState({
        list: res.data,
        loading: false,
      });
    });
  }
  render() {
    let { list, loading } = this.state;
    return (
      <div>
        <Row className="seach_top" justify="space-between">
          <Col>
            <Search
              placeholder="请输入关键字"
              enterButton="搜索"
              size="medium"
              onSearch={(value) => console.log(value)}
            />
          </Col>
          <Col>
            <Button type="primary">
              <Link to={`/articre/add`}>新增</Link>
            </Button>
          </Col>
        </Row>
        <Table
          columns={this.columns}
          dataSource={list}
          loading={loading}
          rowKey={(record, index) => index}
        />
      </div>
    );
  }
}

export default ArticreList;
