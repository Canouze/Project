// ** login.component.js** //
import React, { Component } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";
import { Link } from 'react-router-dom';
export default class Login extends Component {
  constructor(props){
    super(props)
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {email: '', password: ''}
  }
  onChangeEmail(change){
    this.setState({ userEmail: change.target.value })
  }
  onChangePassword(change){
    this.setState({ userPassword: change.target.value })
  }
  onSubmit(change){
    change.preventDefault();
    const userObj = {
      userEmail: this.state.userEmail,
      userPassword: this.state.userPassword
    };
    axios.post('http://localhost:4000/users/login', userObj)
      .then((res) => {
        console.log(res);
        Cookies.set("token", res.data.token);
      }).catch((error) => {
        console.log(error)
      });
    this.setState({ userEmail: '', userPassword: '' })
  }
  render(){
    return (
      <div className = "wrapper">
        <form onSubmit={this.onSubmit} style={{marginLeft: "10em", marginTop: "10em", marginBottom: "10em"}}>
          <h2>Already a member?</h2>
          <p>Please login...</p>
          <label htmlFor="login_email"><b>Email:</b></label>
          <br/>
          <input type="email" placeholder="" id="login_email" value={this.state.userEmail} onChange={this.onChangeEmail} required/>
          <br/>
          <br/>
          <label htmlFor="login_password"><b>Password:</b></label>
          <br/>
          <input type="password" placeholder="" id="login_password" value={this.state.userPassword} onChange={this.onChangePassword} required/>
          <br/>
          <br/>
          <button type="submit" className="login">Login</button>
        </form>
      </div>
    );
  }
}
