import { Component } from "react";
import Input from "./input";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const errors = {};
    const { data } = this.state;
    if (data.Email.trim() === "") errors.Email = "Email is Required!";
    if (data.Password.trim() === "") errors.Password = "Password is Required!";

    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    console.log(errors);
    this.setState({ errors: errors || {} });
    if (errors) return;
  };

  handleChange = ({ currentTarget: input }) => {
    this.validate();
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };

  renderInput = (name, label, type) => {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        label={label}
        onChange={this.handleChange}
        value={data[name]}
        error={errors[name]}
      />
    );
  };
  renderButton = (label) => (
    <button type="submit" className="btn btn-primary">
      {label}
    </button>
  );
}

export default Form;
