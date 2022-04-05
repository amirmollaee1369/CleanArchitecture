import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import PeopleTable from "./peopleTable";
import Pagination from "./common/pagination";
import { getPeople, deletePerson } from "../services/personService";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import SearchBox from "./searchBox";

class People extends Component {
  state = {
    people: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    sortColumn: { path: "firstname", order: "asc" },
  };

  async componentDidMount() {
    const { data: people } = await getPeople();
    this.setState({ people });
  }

  handleDelete = async (person) => {
    const originalPeople = this.state.people;
    const people = originalPeople.filter((m) => m.Id !== person.Id);
    this.setState({ people });

    try {
      await deletePerson(person.Id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This person has already been deleted.");

      this.setState({ people: originalPeople });
    }
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
      people: allPeople,
    } = this.state;

    let filtered = allPeople;
    if (searchQuery)
      filtered = allPeople.filter((m) =>
        m.FirstName.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
        m.LastName.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
        m.Email.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
        m.PhoneNumber.toLowerCase().startsWith(searchQuery.toLowerCase()) 
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const people = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: people };
  };

  render() {
    const { length: count } = this.state.people;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { person } = this.props;

    const { totalCount, data: people } = this.getPagedData();

    return (
      <div className="row">
        <div className="col">
          {person && (
            <Link
              to="/people/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New Person
            </Link>
          )}
          <p>Showing {totalCount} people in the database.</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <PeopleTable
            people={people}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default People;
