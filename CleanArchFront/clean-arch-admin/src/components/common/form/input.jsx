import React from "react";
const Input = ({ name, label, error,...rest }) => {
  console.log(error)
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        {...rest}
        className="form-control"
        id={name}
        name={name}
        placeholder={label}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
