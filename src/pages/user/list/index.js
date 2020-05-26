import React from "react";
import { Table, Tag, Button, message, Input, Row, Col, Modal } from "antd";
import { getUserList } from "@/api/user";
import { Link } from "react-router-dom";
import { parseTime } from "@/utils/utils";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import "./index.scss";
const size = "default";
const { Search } = Input;
const { confirm } = Modal;

class UserList extends React.Component {
  constructor(props) {
    super();
    this.state = {
      list: [],
      loading: false,
      pagination: {
        page: 1,
        pageSize: 10,
      },
    };
    this.columns = [
      {
        title: "序号",
        dataIndex: "user_id",
        key: "user_id",
      },
      {
        title: "用户名",
        dataIndex: "user_name",
        key: "user_name",
      },
      {
        title: "头像",
        dataIndex: "headerImg",
        key: "headerImg",
        render: (text, record) => (
          <img
            style={{ width: "50px", height: "50px", objectFit: "cover" }}
            src={text}
          />
        ),
      },
      {
        title: "公司",
        dataIndex: "user_compony",
        key: "user_compony",
      },
      {
        title: "职位",
        dataIndex: "job",
        key: "job",
      },
      {
        title: "简介",
        dataIndex: "brief",
        key: "brief",
      },
      {
        title: "个人主页",
        dataIndex: "user_web",
        key: "user_web",
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
              <Link to={`/user/detail/${text.user_id}`}>查看</Link>
            </Button>
          </div>
        ),
      },
    ];
  }
  componentDidMount() {
    this.require();
  }
  handleRemove = (id) => {
    let that = this;
    confirm({
      title: "确定要删除么?",
      icon: <ExclamationCircleOutlined />,
      content: "要好好想想哦",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        remove({ blog_id: id }).then((res) => {
          if (res.code === "200") {
            message.success(res.msg);
            that.require();
          } else {
            message.success(res.msg);
          }
        });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  handleSearch = (name) => {
    console.log(name);
    this.require(name);
  };

  require(name) {
    let { pagination } = this.state;

    let obj = {
      page: pagination.page,
      pageSize: pagination.pageSize,
      name,
    };
    this.setState({
      loading: true,
    });
    console.log(obj);
    getUserList(obj).then((res) => {
      this.setState({
        list: res.data.data,
        loading: false,
        pagination: {
          page: pagination.page,
          pageSize: pagination.pageSize,
          total: res.data.page.total,
        },
      });
    });
  }
  handleTableChange = (pagination) => {
    console.log(pagination);
    this.setState(
      {
        pagination: {
          page: pagination.current,
          pageSize: pagination.pageSize,
        },
      },
      () => {
        this.require();
      }
    );
  };

  render() {
    let { list, loading, pagination } = this.state;
    return (
      <div>
        <Row className="seach_top" justify="space-between">
          <Col>
            <Search
              placeholder="请输入关键字"
              enterButton="搜索"
              size="medium"
              onSearch={this.handleSearch}
            />
          </Col>
        </Row>
        <Table
          columns={this.columns}
          dataSource={list}
          loading={loading}
          pagination={pagination}
          onChange={this.handleTableChange}
          rowKey={(record, index) => index}
        />
      </div>
    );
  }
}

export default UserList;
