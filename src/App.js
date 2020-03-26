import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "@/layout";
import "@/styles/public.less";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" component={Layout} />
      </Switch>
    </div>
  );
}

export default App;
