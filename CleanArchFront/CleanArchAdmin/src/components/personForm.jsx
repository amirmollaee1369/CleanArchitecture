import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getPerson, savePerson } from "../services/personService";

class PersonForm extends Form {
  state = {
    data: {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      phonenumber: "",
    },
    errors: {},
  };

  schema = {
    Id: Joi.number(),
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

  async populatePerson() {
    try {debugger
      const personId = this.props.match.params.id;
      if (personId === "new") return;

      const { data: person } = await getPerson(personId);
      this.setState({ data: this.mapToViewModel(person) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populatePerson();
  }

  mapToViewModel(person) {
    return {
      Id: person.Id,
      email: person.Email,
      password: person.Password,
      firstname: person.FirstName,
      lastname: person.LastName,
      phonenumber: person.PhoneNumber,
    };
  }

  doSubmit = async () => {
    await savePerson(this.state.data);

    this.props.history.push("/people");
  };

  render() {
    return (
      <div>
        <h1>Person Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password")}
          {this.renderInput("firstname", "FirstName")}
          {this.renderInput("lastname", "LastName")}
          {this.renderInput("phonenumber", "PhoneNumber")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default PersonForm;
