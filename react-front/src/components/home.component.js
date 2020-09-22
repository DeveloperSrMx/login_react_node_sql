import React, { Component } from "react";

import UserService from "../services/user.service";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      (response) => {
        this.setState({
          content: response.data,
        });
      },
      (error) => {
        this.setState({
          content: error.response.data
        });
      }
    );
  }

  render() {
    return (
      <div className="centerDiv">
        <h3>{this.state.content}</h3>
        <h4>This login application was developed with the following technologies:</h4>
        <div className="centerDiv__div">
          <p>Docker</p>
          <p>Docker-compose</p>
          <p>React</p>
          <p>Node</p>
          <p>Express</p>
          <p>MySQL</p>
          <p>Sequelize</p>
          <p>OpenAPI</p>
          <p>JWT</p>
          <p>JEST</p>
          <p>CSS</p>
          <p>HTML</p>
        </div>
      </div>
    );
  }
}
