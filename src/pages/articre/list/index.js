import React from "react";
import { Table, Tag, Button } from "antd";
import "./index.css";
const size = "small";
const columns = [
  {
    title: "序号",
    dataIndex: "name",
    key: "name",
    render: text => <a>{text}</a>
  },
  {
    title: "标题",
    dataIndex: "age",
    key: "age"
  },
  {
    title: "简介",
    dataIndex: "address",
    key: "address"
  },
  {
    title: "更新时间",
    dataIndex: "address",
    key: "address"
  },
  {
    title: "分类",
    key: "tags",
    dataIndex: "tags",
    render: tags => (
      <span>
        {tags.map(tag => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    )
  },
  {
    title: "操作",
    key: "action",
    render: (text, record) => (
      <div className="table-actions">
        <Button size={size}>编辑</Button>
        <Button size={size} type="primary" danger>
          删除
        </Button>
      </div>
    )
  }
];
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"]
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"]
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"]
  }
];
class ArticreList extends React.Component {
  render() {
    return (
      <div>
        <span>Articre</span>
        <Table columns={columns} dataSource={data} />
      </div>
    );
  }
}

export default ArticreList;
