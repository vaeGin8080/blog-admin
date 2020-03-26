import React from "react";
import { withRouter, Redirect, Route } from "react-router-dom";

//首页
import Home from "@/pages/home";
import Articre from "@/pages/articre";

class ContentMain extends React.Component {
  render() {
    return (
      <div style={{ padding: 16, position: "relative" }}>
        <React.Fragment>
          <Route path="/home" component={Home}></Route>
          <Route path="/articre" component={Articre}></Route>
          <Redirect exact from="/" to="/home" />
        </React.Fragment>
      </div>
    );
  }
}

export default ContentMain;
