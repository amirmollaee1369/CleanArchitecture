import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import People from "./components/people";
import PersonForm from "./components/personForm";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import ProtectedRoute from "./components/common/protectedRoute";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Home from "./components/home";

class App extends Component {
  state = {};

  componentDidMount() {
    const person = auth.getCurrentPerson();
    this.setState({ person });
  }

  render() {
    const { person } = this.state;

    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar person={person} />
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <ProtectedRoute path="/people/:id" component={PersonForm} />
            <ProtectedRoute path="/people"  render={props => <People {...props} person={this.state.person} />}/>
            
            <Route path="/" component={Home} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
