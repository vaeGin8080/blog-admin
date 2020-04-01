import React, { Component } from "react";
import { Button, Layout } from "antd";
import Slide from "./sidebar";
import ContentMain from "@/components/ContentMain";
import Head from "@/components/Head";

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
            <Header
              style={{
                position: "fixed",
                zIndex: 1,
                maxWidth: "100%",
                width: " calc(100% - 200px)",
                boxSizing: "border-box"
              }}
            >
              <Head></Head>
            </Header>
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
