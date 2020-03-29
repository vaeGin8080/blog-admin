import React from "react";
import { withRouter, Redirect, Route } from "react-router-dom";

//首页
import Home from "@/pages/home";
import ArticreList from "@/pages/articre/list";
import ArticreAdd from "@/pages/articre/add";
import ArticreDetail from "@/pages/articre/detail";

class ContentMain extends React.Component {
  render() {
    return (
      <div style={{ padding: 16, position: "relative" }}>
        <React.Fragment>
          <Route path="/home" component={Home}></Route>
          <Route path="/articre/list" component={ArticreList}></Route>
          <Route path="/articre/add" component={ArticreAdd}></Route>
          <Route path="/articre/detail/:id" component={ArticreDetail}></Route>
          {/* <Redirect exact from="/" to="/home" /> */}
        </React.Fragment>
      </div>
    );
  }
}

export default ContentMain;
