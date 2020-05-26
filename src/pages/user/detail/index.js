import React, { Component } from "react";
import Editor from "for-editor";
import { Row, Col, PageHeader } from "antd";
import { getUserInfo } from "@/api/user";
import "./index.css";

class ArticreDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      form: {},
    };
  }
  goBack() {
    this.props.history.goBack();
  }
  componentDidMount() {
    this.require();
  }
  require() {
    getUserInfo({
      id: this.state.id,
    }).then((res) => {
      if (res.code === "200") {
        let {
          user_name,
          brief,
          job,
          create_date,
          headerImg,
          user_id,
          user_web,
          user_compony,
        } = res.data;
        let form = {
          user_name,
          brief,
          job,
          create_date,
          headerImg,
          user_id,
          user_web,
          user_compony,
        };
        this.setState({
          form: form,
        });
      }
    });
  }
  render() {
    let { form } = this.state;
    return (
      <div className="detail">
        <PageHeader
          className="site-page-header"
          onBack={() => this.goBack()}
          title="用户详情"
        />
        <div
          style={{
            background: "white",
            borderRadius: "10px",
            padding: "10px",
            marginBottom: "20px",
          }}
        >
          <Row gutter={[16, 8]}>
            <Col flex="200px" className="label">
              用户名:
            </Col>
            <Col flex="auto" className="value">
              {form.user_name}
            </Col>
          </Row>
          <Row gutter={[16, 8]}>
            <Col flex="200px" className="label">
              公司:
            </Col>
            <Col flex="auto" className="value">
              {form.user_compony}
            </Col>
          </Row>
          <Row gutter={[16, 8]}>
            <Col flex="200px" className="label">
              职位:
            </Col>
            <Col flex="auto" className="value">
              {form.job}
            </Col>
          </Row>
          <Row gutter={[16, 8]}>
            <Col flex="200px" className="label">
              简介:
            </Col>
            <Col flex="auto" className="value">
              {form.brief}
            </Col>
          </Row>
          <Row gutter={[16, 8]}>
            <Col flex="200px" className="label">
              个人主页:
            </Col>
            <Col flex="auto" className="value">
              <a href={"http://" + form.user_web} target="_blank">
                {form.user_web}
              </a>
            </Col>
          </Row>
          <Row gutter={[16, 8]}>
            <Col flex="200px" className="label">
              头像:
            </Col>
            <Col flex="auto" className="value">
              <img
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
                src={form.headerImg}
              />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default ArticreDetail;
