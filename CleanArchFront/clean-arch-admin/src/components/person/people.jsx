import React, { Component } from "react";
import Pagination from "../common/custom-table/pagination";
import { paginate } from "../../utils/paginate.js";
import PeopleTable from "./people-table";
import _ from "lodash";
import { Link } from "react-router-dom";

class PeopleComponent extends Component {
  state = {
    people: [
      { Id: 1, FirstName: "ali" },
      { Id: 2, FirstName: "reza" },
      { Id: 3, FirstName: "mohamad" },
      { Id: 4, FirstName: "amir" },
    ],
    pageSize: 2,
    currentPage: 1,
    sortColumn: { path: "Id", order: "asc" },
  };

  componentDidMount() {

  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
    console.log(page);
  };

  handleDelete = (person) => {
    const people = this.state.people.filter((p) => p.Id !== person.Id);
    this.setState({ people });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const { pageSize, currentPage, people: AllPeople, sortColumn } = this.state;
    const sorted = _.orderBy(AllPeople, [sortColumn.path], [sortColumn.order]);
    const data = paginate(sorted, currentPage, pageSize);
    return data;
  };

  render() {
    const count = this.state.people.length;
    const { pageSize, currentPage, sortColumn } = this.state;

    if (count === 0) return <p>There are no People in DataBase</p>;

    return (
      <React.Fragment>
        <Link to="/person" className="btn btn-primary">
          New Person
        </Link>
        <PeopleTable
          people={this.getPagedData()}
          sortColumn={sortColumn}
          onDelete={this.handleDelete}
          onSort={this.handleSort}
        ></PeopleTable>
        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
}

export default PeopleComponent;
