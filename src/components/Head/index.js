import React, { Component } from "react";
import { Row, Col, Avatar } from "antd";

class Head extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const user = "Vae";
    const color = "#f56a00";
    return (
      <div>
        <Row justify="end">
          <Col>
            <Avatar
              style={{ backgroundColor: color, verticalAlign: "middle" }}
              size="large"
            >
              {user}
            </Avatar>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Head;
