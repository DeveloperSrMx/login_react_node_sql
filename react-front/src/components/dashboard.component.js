import React, { Component } from "react";

import UserService from "../services/user.service";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
    };
  }

  componentDidMount() {
    UserService.getDashboard().then(
      (response) => {
        this.setState({
          content: response.data,
        });
      },
      (error) => {
        this.setState({
          content: error.response.data.message
        });
      }
    );
  }

  render() {
    return (
      <div className="centerDiv">
          <h3>{this.state.content}</h3>
      </div>
    );
  }
}
