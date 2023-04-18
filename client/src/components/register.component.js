// ** register.component.js ** //
import React, { Component } from 'react';
import axios from 'axios';
export default class Register extends Component {
  constructor(props){
    super(props)
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePassword2 = this.onChangePassword2.bind(this);
    this.onChangeFname = this.onChangeFname.bind(this);
    this.onChangeLname = this.onChangeLname.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {email: '', password: '', password2: '', fname: '', lname: ''}
  }
  onChangeEmail(change){
    this.setState({ userEmail: change.target.value })
  }
  onChangePassword(change){
    this.setState({ userPassword: change.target.value })
  }
  onChangeFname(change){
    this.setState({ userFname: change.target.value })
  }
  onChangeLname(change){
    this.setState({ userLname: change.target.value })
  }
  onChangePassword2(change){
    this.setState({ userPassword2: change.target.value })
  }
  onSubmit(change){
    change.preventDefault();
    const userObj = {
      userEmail: this.state.userEmail,
      userPassword: this.state.userPassword,
      userPassword2: this.state.userPassword2,
      userFname: this.state.userFname,
      userLname: this.state.userLname
    };
    axios.post('http://localhost:4000/users/register', userObj)
      .then((res) => {
      }).catch((error) => {
        console.log(error)
      });
    this.setState({ userEmail: '', userPassword: '', userPassword2: '', userFname: '', userLname: '' })
  }
  render(){
    return(
      <div className = "wrapper">
        <form onSubmit={this.onSubmit} style={{marginLeft: "10em", marginTop: "10em", marginBottom: "10em"}}>
          <h2>Register</h2>
          <p>We need some details...</p>
          <label htmlFor="register_email"><b>Email:</b></label>
          <br/>
          <input type="email" placeholder="" id="register_email" value={this.state.userEmail} onChange={this.onChangeEmail} required/>
          <br/>
          <br/>
          <label htmlFor="register_password"><b>Password:</b></label>
          <br/>
          <input type="password" placeholder="" id="register_password" value={this.state.userPassword} onChange={this.onChangePassword} required/>
          <br/>
          <br/>
          <label htmlFor="register_password2"><b>Repeat Password:</b></label>
          <br/>
          <input type="password" placeholder="" id="register_password2" value={this.state.userPassword2} onChange={this.onChangePassword2} required/>
          <br/>
          <br/>
          <label htmlFor="register_fname"><b>First Name:</b></label>
          <br/>
          <input type="text" placeholder="" id="register_fname" value={this.state.userFname} onChange={this.onChangeFname} required/>
          <br/>
          <br/>
          <label htmlFor="register_lname"><b>First Name:</b></label>
          <br/>
          <input type="text" placeholder="" id="register_lname" value={this.state.userLname} onChange={this.onChangeLname} required/>
          <br/>
          <br/>
          <button type="submit" className="register">Register</button>
        </form>
      </div>
    )
  }
}
