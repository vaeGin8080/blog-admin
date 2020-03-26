import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Layout from "./layoout";
import "@/styles/index.less";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Layout></Layout>
        {/* <Route path="/" component={Layout}></Route> */}
      </header>
    </div>
  );
}

export default App;
