import React, { useState } from "react";
import axios from "axios";

class Login extends React.Component {
  state = {
    credentials: {
      username: '',
      password: ''
    },
    isLoggedIn: false
  };

  handleChanges = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  }

  componentDidMount() {
      if(sessionStorage.getItem('token')) {
        this.setState({ ...this.state, isLoggedIn: true })
      } else {
        this.setState({ ...this.state, isLoggedIn: false })
      }
  }

  login = e => {
    e.preventDefault();
    console.log(this)
    axios
      .post('http://localhost:5000/api/login', this.state.credentials)
      .then(res => {
        console.log('response', res);
        const { data } = res;
        sessionStorage.setItem('token', data.payload);
        this.setState({ ...this.state, isLoggedIn: true});
        this.props.history.push('/protected/bubble-page')
      })
  }
  render() {
    return (
      <>
        <h2>{this.state.isLoggedIn ? "LOGGED IN!" : "Please login"}</h2>
              <form onSubmit={this.login}>
              <input
                  type="text"
                  name="username"
                  value={this.state.credentials.username}
                  onChange={this.handleChanges}
              />
              <input
                  type="password"
                  name="password"
                  value={this.state.credentials.password}
                  onChange={this.handleChanges}
              />
              <button>Log in</button>
              </form>
      </>
    );
  }
};

export default Login;
