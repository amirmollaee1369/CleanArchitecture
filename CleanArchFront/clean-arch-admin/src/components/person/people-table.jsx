import React, { Component } from "react";
import Table from "../common/custom-table/table";
import { Link } from "react-router-dom";
class PeopleTable extends Component {
  columns = [
    { path: "Id", label: "Id" },
    { path: "FirstName", label: "FirstName" },
    {
      key: "detail",
      content: (person) => (
        <Link
          to={"/person/" + person.Id}
          key={person.Id}
          className="btn btn-info fa fa-eye"
        />
      ),
    },
    {
      key: "delete",
      content: (person) => (
        <button
          onClick={() => this.props.onDelete(person)}
          className="btn btn-danger fa fa-times"
        ></button>
      ),
    },
  ];
  render() {
    const { people, onDelete, onSort, sortColumn } = this.props;
    return (
      <Table
        data={people}
        onDelete={onDelete}
        columns={this.columns}
        onSort={onSort}
        sortColumn={sortColumn}
      />
    );
  }
}

export default PeopleTable;
