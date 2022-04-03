import React from "react";
import Form from "../common/form/form";

class PeronForm extends Form {
  state = {
    data: {
      Id: "",
      FirstName: "",
    },
    errors: {},
  };

  onSaveBtn = () => {
    const personId = this.props.match.params.id;
    
    debugger;
  };

  render() {
    return (
      <React.Fragment>
        <h1>person</h1>
        <button onClick={this.onSaveBtn} className="btn btn-success">
          save
        </button>
      </React.Fragment>
    );
  }
}

export default PeronForm;
