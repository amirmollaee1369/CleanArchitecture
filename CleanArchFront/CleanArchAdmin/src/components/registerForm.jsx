import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import * as personService from "../services/personService";
import auth from "../services/authService";

class RegisterForm extends Form {
  state = {
    data: { email: "", password: "", firstname: "", lastname: "" , phonenumber: ""},
    errors: {}
  };

  schema = {
    email: Joi.string()
      .required()
      .email()
      .label("Email"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password"),
    firstname: Joi.string()
      .required()
      .label("FirstName"),
      lastname: Joi.string()
      .required()
      .label("LastName"),
      phonenumber: Joi.string()
      .required()
      .label("PhoneNumber")
  };

  doSubmit = async () => {
    try {
      const response = await personService.savePerson(this.state.data);
      auth.loginWithJwt(response.headers["Authorization"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("firstname", "FirstName")}
          {this.renderInput("lastname", "LastName")}
          {this.renderInput("phonenumber", "PhoneNumber")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
