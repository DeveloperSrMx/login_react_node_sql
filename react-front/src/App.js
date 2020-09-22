import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import AuthService from "./services/auth.service";
import Login from "./components/login.component";
import Signup from "./components/signup.component";
import Home from "./components/home.component";
import Me from "./components/me.component";
import Dashboard from "./components/dashboard.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);

    this.state = {
      loggedUser: undefined,
      showDashboard: false
    };
  }

  componentDidMount() {
    const user = AuthService.getLoggedUser();
    if (user) {
      this.setState({
        loggedUser: user,
        showDashboard: true
      });
    }
  }

  logout() {
    AuthService.logout();
  }

  render() {
    const { loggedUser, showDashboard } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-oyster">
          <Link to={"/"} className="navbar-brand">Oyster</Link>
          <div className="navbar-nav mr-auto">
            {showDashboard && (
              <li className="nav-item">
                <Link to={"/dashboard"} className="nav-link font-weight-bold navbar-nav__nav-item--link">Dashboard</Link>
              </li>
            )}
          </div>

          {loggedUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/me"} className="nav-link font-weight-bold navbar-nav__nav-item--link"> {loggedUser.username} </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link font-weight-bold navbar-nav__nav-item--link" onClick={this.logout}> Logout </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link font-weight-bold navbar-nav__nav-item--link"> Login </Link>
              </li>
              <li className="nav-item">
                <Link to={"/signup"} className="nav-link font-weight-bold navbar-nav__nav-item--link"> Sign Up </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/me" component={Me} />
            <Route path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
