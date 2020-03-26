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
            <Header>Header</Header>
            <Content>
              <ContentMain></ContentMain>
            </Content>
            <Footer>Footer</Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default LayoutWrap;
