import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = ({ person }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        CleanArchAdmin
      </Link>
      <div className="navbar-nav">
        <NavLink className="nav-item nav-link" to="/Home">
          Home
        </NavLink>
        {!person && (
          <React.Fragment>
            <NavLink className="nav-item nav-link" to="/login">
              Login
            </NavLink>
            <NavLink className="nav-item nav-link" to="/register">
              Register
            </NavLink>
          </React.Fragment>
        )}
        {person && (
          <React.Fragment>
            <NavLink className="nav-item nav-link" to="/people">
              People
            </NavLink>
            <NavLink className="nav-item nav-link" to="/profile">
              {person.name}
            </NavLink>
            <NavLink className="nav-item nav-link" to="/logout">
              Logout
            </NavLink>
          </React.Fragment>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
