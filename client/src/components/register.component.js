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
    this.onChangeUserType = this.onChangeUserType.bind(this);
    this.onChangeTeamKey = this.onChangeTeamKey.bind(this);
    this.onChangeTeamName = this.onChangeTeamName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {email: '', password: '', password2: '', fname: '', lname: '', isAdmin: false, teamKey: '', teamName: ''};
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
  onChangeTeamKey(change){
    this.setState({ teamKey: change.target.value})
  }
  onChangeTeamName(change){
    this.setState({ teamName: change.target.value})
  }
  onChangeUserType(change){
    if(change.target.value==="standard_user"){
      this.setState({ isAdmin: false})
    }
    else{
      this.setState({ isAdmin: true })
    }
  }
  additionalContent(){
    if(this.state.isAdmin===false){
      return(
        <>
        <label htmlFor="teamKey">Unique Team Key (provided by your Administrator):</label>
        <br/>
        <br/>
        <input type="text" placeholder="" id="teamKey" value={this.state.teamKey} onChange={this.onChangeTeamKey} required/>
        <br/>
        <br/>
        </>
      )
    }
    else{
      return(
        <>
        <label htmlFor="teamName">Enter a name for your new Team:</label>
        <br/>
        <br/>
        <input type="text" placeholder="" id="teamName" value={this.state.teamName} onChange={this.onChangeTeamName} required/>
        <br/>
        <br/>
        </>
      )
    }
  }
  onSubmit(change){
    change.preventDefault();
    const userObj = {
      userEmail: this.state.userEmail,
      userPassword: this.state.userPassword,
      userPassword2: this.state.userPassword2,
      userFname: this.state.userFname,
      userLname: this.state.userLname,
      isAdmin: this.state.isAdmin,
      teamKey: this.state.teamKey,
      teamName: this.state.teamName
    };
    axios.post('http://localhost:4000/users/register', userObj)
      .then((res) => {
      }).catch((error) => {
          alert(error.response.data.message);
      });
    this.setState({ userEmail: '', userPassword: '', userPassword2: '', userFname: '', userLname: '', userType: '' });
    console.log(this.props);
    this.props.navigation.navigate('/login')
  }
  render(){
    return(
      <div className = "wrapper">
        <form onSubmit={this.onSubmit} style={{marginLeft: "5em", marginTop: "2em", marginBottom: "10em", display: "flex"}}>
          <div class="col-md-6" style={{marginTop: "5em"}}>
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
          </div>
          <div class="col-md-6" style={{marginTop: "8em", paddingRight: "10em"}}>
            <p>Do you want to join an existing team or register as an admin and create a new team?</p>
            <br/>
            <label htmlFor="notAdmin"><b>Standard User - Join an Existing Team</b></label>
            <br/>
            <input type="radio" id="notAdmin" name="userType" value="standard_user" onChange={this.onChangeUserType}/>
            <br/>
            <label htmlFor="admin"><b>Admin User - Create a new Team</b></label>
            <br/>
            <input type="radio" id="admin" name="userType" value="admin_user" onChange={this.onChangeUserType}/>
            <br/>
            <br/>
            {this.additionalContent()}
            <button type="submit" className="register">Register</button>
          </div>
        </form>
      </div>
    )
  }
}
