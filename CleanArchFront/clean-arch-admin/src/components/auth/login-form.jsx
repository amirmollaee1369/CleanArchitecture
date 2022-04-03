import React from "react";
import Form from "./../common/form/form";

class LoginFormComponent extends Form {
  state = {
    data: {
      Email: "",
      Password: "",
    },
    errors: {},
  };

  doSubmit = () => {
    console.log("submit");
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderInput("Email", "Email", "email")}
        {this.renderInput("Password", "Password", "password")}
        {this.renderButton("Login")}
      </form>
    );
  }
}

export default LoginFormComponent;
