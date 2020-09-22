import React, { Component } from "react";
import AuthService from "../services/auth.service";

export default class Me extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedUser: AuthService.getLoggedUser(),
    };
  }

  render() {
    const { loggedUser } = this.state;

    return (
      <div className="centerDiv__div">
        <ol>
          <ul><strong>Id:</strong> {loggedUser.id}</ul>
          <ul><strong>Username:</strong> {loggedUser.username}</ul>
          <ul><strong>Email:</strong> {loggedUser.email}</ul>
        </ol>
        </div> 
    );
  }
}
