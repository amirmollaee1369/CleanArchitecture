import React, { Component } from "react";
import auth from "../services/authService";
import { Link } from "react-router-dom";
import Table from "./common/table";

class PeopleTable extends Component {
  columns = [
    {
      path: "FirstName",
      label: "FirstName",
      content: person => <Link to={`/people/${person.Id}`}>{person.FirstName}</Link>
    },
    { path: "LastName", label: "LastName" },
    { path: "Email", label: "Email" },
    { path: "Password", label: "Password" },
    { path: "PhoneNumber", label: "PhoneNumber" },
    { path: "RegDate", label: "RegDate" },
  ];

  deleteColumn = {
    key: "delete",
    content: person => (
      <button
        onClick={() => this.props.onDelete(person)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    )
  };

  constructor() {
    super();
    const person = auth.getCurrentPerson();
    if (person) this.columns.push(this.deleteColumn);
  }

  render() {
    const { people, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={people}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default PeopleTable;
