import React from "react";
import { withRouter, Redirect, Route, Switch } from "react-router-dom";
import PrivateRoute from "../PrivateRoute";

//首页
import Home from "@/pages/home";
import AllList from "@/pages/all/list";
import UserList from "@/pages/user/list";
import UserDetail from "@/pages/user/detail";
import UserUpdate from "@/pages/user/update";
import ArticreList from "@/pages/articre/list";
import ArticreAdd from "@/pages/articre/add";
import ArticreDetail from "@/pages/articre/detail";

class ContentMain extends React.Component {
  render() {
    return (
      <div style={{ padding: 16, position: "relative" }}>
        <React.Fragment>
          <Switch>
            <Redirect exact from="/" to="/home" />
            <PrivateRoute path="/home" component={Home}></PrivateRoute>
            <PrivateRoute path="/all/list" component={AllList}></PrivateRoute>
            <PrivateRoute path="/user/list" component={UserList}></PrivateRoute>
            <PrivateRoute
              path="/user/detail/:id"
              component={UserDetail}
            ></PrivateRoute>
            <PrivateRoute
              path="/user/update/:id"
              component={UserUpdate}
            ></PrivateRoute>
            <PrivateRoute
              path="/user/update"
              component={UserUpdate}
            ></PrivateRoute>
            <PrivateRoute
              path="/articre/list"
              component={ArticreList}
            ></PrivateRoute>
            <PrivateRoute
              path="/articre/add/:id"
              exact
              component={ArticreAdd}
            ></PrivateRoute>
            <PrivateRoute
              path="/articre/add"
              exact
              component={ArticreAdd}
            ></PrivateRoute>
            <PrivateRoute
              path="/articre/detail/:id"
              component={ArticreDetail}
            ></PrivateRoute>
          </Switch>
        </React.Fragment>
      </div>
    );
  }
}

export default ContentMain;
