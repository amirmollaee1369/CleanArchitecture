import React from "react";
import "./App.css";
import NavbarComponent from "./components/navbar/navbar";
import PeopleComponent from "./components/person/people";
import { Route, Switch } from "react-router-dom";
import HomeComponent from "./components/home/home";
import NotFoundComponent from "./components/not-found/not-found";
import PersonForm from './components/person/person-form';
import LoginFormComponent from './components/auth/login-form';

function App() {
  return (
    <React.Fragment>
      <NavbarComponent />
      <div className="content">
        <Switch>
          <Route path="/person/:id" component={PersonForm} />
          <Route path="/people" component={PeopleComponent} />
          <Route path="/login" component={LoginFormComponent} />
          <Route path="/notfound" component={NotFoundComponent} />
          <Route path="/" exact component={HomeComponent} />
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default App;
