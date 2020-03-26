import React from "react";
import "./index.css";

class Logo extends React.Component {
  render() {
    return (
      <div className="logo">
        <img
          className="logo-img"
          src="http://qiniu.yesterdaypub.cn/image%2Flogo.png"
        />
      </div>
    );
  }
}

export default Logo;
