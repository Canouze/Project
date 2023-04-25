// ** register.component.js ** //
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
function Register(){
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [isAdmin, setIsAdmin] = useState("");
  const [teamKey, setTeamKey] = useState("");
  const [teamName, setTeamName] = useState("");
  const handleEmailChange = e => {
    setEmail(e.target.value);
  }
  const handlePasswordChange = e => {
    setPassword(e.target.value);
  }
  const handlePassword2Change = e => {
    setPassword2(e.target.value);
  }
  const handleFNameChange = e => {
    setFName(e.target.value);
  }
  const handleLNameChange = e => {
    setLName(e.target.value);
  }
  const handleIsAdminChange = e => {
    setIsAdmin(e.target.value);
  }
  const handleTeamKeyChange = e => {
    setTeamKey(e.target.value);
  }
  const handleTeamNameChange = e => {
    setTeamName(e.target.value);
  }

  const handleUserTypeChange = e => {
    if(e.target.value==="standard_user"){
      setIsAdmin(false);
    }
    else{
      setIsAdmin(true);
    }
  }

  const additionalContent = e => {
    if(isAdmin===false){
      return(
        <>
        <label htmlFor="teamKey">Unique Team Key (provided by your Administrator):</label>
        <br/>
        <br/>
        <input type="text" placeholder="" id="teamKey" value={teamKey} onChange={handleTeamKeyChange} required/>
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
        <input type="text" placeholder="" id="teamName" value={teamName} onChange={handleTeamNameChange} required/>
        <br/>
        <br/>
        </>
      )
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    const userObj = {
      userEmail: email,
      userPassword: password,
      userPassword2: password2,
      userFname: fname,
      userLname: lname,
      isAdmin: isAdmin,
      teamKey: teamKey,
      teamName: teamName
    };
    axios.post('http://localhost:4000/users/register', userObj)
      .then((res) => {
      }).catch((error) => {
          alert(error.response.data.message);
      });
    navigate('/login');
  }
  return(
    <div className = "wrapper">
      <form onSubmit={handleSubmit} style={{marginLeft: "5em", marginTop: "2em", marginBottom: "10em", display: "flex"}}>
        <div class="col-md-6" style={{marginTop: "3em"}}>
          <h2>Register</h2>
          <p>We need some details...</p>
          <label htmlFor="register_email"><b>Email:</b></label>
          <br/>
          <input type="email" placeholder="" id="register_email" value={email} onChange={handleEmailChange} required/>
          <br/>
          <br/>
          <label htmlFor="register_password"><b>Password:</b></label>
          <br/>
          <input type="password" placeholder="" id="register_password" value={password} onChange={handlePasswordChange} required/>
          <br/>
          <br/>
          <label htmlFor="register_password2"><b>Repeat Password:</b></label>
          <br/>
          <input type="password" placeholder="" id="register_password2" value={password2} onChange={handlePassword2Change} required/>
          <br/>
          <br/>
          <label htmlFor="register_fname"><b>First Name:</b></label>
          <br/>
          <input type="text" placeholder="" id="register_fname" value={fname} onChange={handleFNameChange} required/>
          <br/>
          <br/>
          <label htmlFor="register_lname"><b>Last Name:</b></label>
          <br/>
          <input type="text" placeholder="" id="register_lname" value={lname} onChange={handleLNameChange} required/>
          <br/>
          <br/>
        </div>
        <div class="col-md-6" style={{marginTop: "5em", paddingRight: "10em"}}>
          <p>Do you want to join an existing team or register as an admin and create a new team?</p>
          <br/>
          <label htmlFor="notAdmin"><b>Standard User - Join an Existing Team</b></label>
          <br/>
          <input type="radio" id="notAdmin" name="userType" value="standard_user" onChange={handleUserTypeChange}/>
          <br/>
          <label htmlFor="admin"><b>Admin User - Create a new Team</b></label>
          <br/>
          <input type="radio" id="admin" name="userType" value="admin_user" onChange={handleUserTypeChange}/>
          <br/>
          <br/>
          {additionalContent()}
          <button type="submit" className="register">Register</button>
        </div>
      </form>
    </div>
  )
}

export default Register;
