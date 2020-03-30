import React, { Component } from "react";
import { Button, Layout } from "antd";
import Slide from "./sidebar";
import ContentMain from "@/components/ContentMain";

const { Header, Footer, Sider, Content } = Layout;
class LayoutWrap extends Component {
  render() {
    return (
      <div className="App">
        <Layout className="App">
          <Sider>
            <Slide></Slide>
          </Sider>
          <Layout>
            <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
              Header
            </Header>
            <Content style={{ padding: "0 15px", marginTop: 64 }}>
              <ContentMain></ContentMain>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default LayoutWrap;
