import React, { Component } from "react";
import { Button, Layout } from "antd";
import Slide from "./sidebar";
import ContentMain from "@/components/ContentMain";
import Head from "@/components/Head";

const { Header, Footer, Sider, Content } = Layout;
class LayoutWrap extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="App">
        <Layout className="App">
          <Header
            style={{
              position: "fixed",
              zIndex: 1,
              maxWidth: "100%",
              width: " calc(100%)",
              boxSizing: "border-box",
            }}
          >
            <Head history={this.props.history}></Head>
          </Header>

          <Layout>
            <Sider breakpoint="lg" collapsedWidth="0">
              <Slide></Slide>
            </Sider>
            <Content style={{ padding: "0 0px", marginTop: 64 }}>
              <ContentMain></ContentMain>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default LayoutWrap;
