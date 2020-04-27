import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "@/layout";
import PrivateRoute from "./components/PrivateRoute";
import Login from "@/pages/login";
import "@/styles/public.less";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={Layout}></Route>
      </Switch>
    </div>
  );
}

export default App;
