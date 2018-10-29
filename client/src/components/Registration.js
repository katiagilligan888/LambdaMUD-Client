import React, { Component } from "react";
import axios from "axios";

class Registration extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      passwordCheck: "",
      error: ""
    };
  }

  onInputChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value,
      error: ""
    });
  };

  onSubmitHandler = event => {
    const { username, password, passwordCheck } = this.state;

    const userRegistration = {
      username,
      password1: password,
      password2: passwordCheck
    };

    event.preventDefault();
    if (password === passwordCheck && password.length > 5) {
      axios
        .post("http://localhost:8000/api/registration", userRegistration)
        .then(response => {
          localStorage.setItem("token", response.data.key);
          this.setState({
            username: "",
            password: "",
            passwordCheck: ""
          });
        })
        .catch(err => {
          this.setState({
            error: "Username already taken. Please choose another"
          });
        });
    } else if (password.length < 6) {
      this.setState({
        error: "Password length must be at least 6 characters long",
        password: "",
        passwordCheck: ""
      });
    } else {
      this.setState({
        error: "Passwords do not match. Please try again",
        password: "",
        passwordCheck: ""
      });
    }
  };

  render() {
    return (
      <div className="registration">
        <h1>Register</h1>
        <form onSubmit={this.onSubmitHandler}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.onInputChangeHandler}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.onInputChangeHandler}
          />
          <input
            type="password"
            name="passwordCheck"
            placeholder="Verify Password"
            value={this.state.passwordCheck}
            onChange={this.onInputChangeHandler}
          />
          <button type="submit"> Get Started </button>
        </form>
        <div className="error">{this.state.error}</div>
      </div>
    );
  }
}

export default Registration;
