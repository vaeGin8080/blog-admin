import React, { Component } from "react";
import "./index.scss";
import LoginForm from "./loginForm";
import RegisterForm from "./regisgerForm";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showBox: "login"
    };
  }
  switchShowBox = box => {
    this.setState({
      showBox: box
    });
  };
  render() {
    let { showBox } = this.state;
    return (
      <div className="wrap">
        <div className="backgroundBox"></div>
        <div className="login_box">
          <LoginForm
            history={this.props.history}
            className={showBox == "login" ? "box box-show" : "box box-hidden"}
            switchShowBox={this.switchShowBox}
          ></LoginForm>
          <RegisterForm
            history={this.props.history}
            className={
              showBox == "register" ? "box box-show" : "box box-hidden"
            }
            switchShowBox={this.switchShowBox}
          ></RegisterForm>
        </div>
      </div>
    );
  }
}
export default Login;
