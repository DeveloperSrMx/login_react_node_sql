import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from "../services/auth.service";

const required = (val) => {
  if (!val) {
    return (<div className="text-danger"><p className="font-weight-bold">Required field!</p></div>);
  }
};

const email = (val) => {
  if (!isEmail(val)) {
    return (<div className="text-danger"><p className="font-weight-bold">Invalid email!</p></div>);
  }
};

const usernameValidation = (value) => {
  if (value.length < 2 || value.length > 15) {
    return (<div className="text-danger"><p className="font-weight-bold">The username must be between 2 and 15 characters!</p></div>);
  }
};

const passwordValidation = (value) => {
  if (value.length < 8 || value.length > 16) {
    return (<div className="text-danger"><p className="font-weight-bold">The password must be between 8 and 16 characters!</p></div>);
  }
};

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.handleSignup = this.handleSignup.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      successful: false,
      message: "",
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleSignup(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.signup(
        this.state.username,
        this.state.email,
        this.state.password
      ).then(
        (response) => {
          this.setState({
            message: response.data.message,
            successful: true,
          });
        },
        (error) => {
          this.setState({
            successful: false,
            message: error.response.data.message
          });
        }
      );
    }
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container">
          <Form onSubmit={this.handleSignup} ref={(c) => { this.form = c; }}>
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[required, usernameValidation]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, email]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, passwordValidation]}
                  />
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block bg-oyster">Sign Up</button>
                </div>
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div className={ this.state.successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton style={{ display: "none" }} ref={(c) => { this.checkBtn = c; }}/>
          </Form>
        </div>
      </div>
    );
  }
}
