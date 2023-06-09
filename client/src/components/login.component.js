// ** login.component.js** //
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Cookies from "js-cookie";
import { Link } from 'react-router-dom';
function Login(){
  let navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState('');
  const handleEmailChange = e => {
    setEmail(e.target.value);
  }
  const handlePasswordChange = e => {
    setPassword(e.target.value);
  }
  const handleSubmit = e => {
    e.preventDefault();
    const userObj = {
      userEmail: email,
      userPassword: password
    }
    axios.post('http://localhost:4000/users/login', userObj)
      .then((res) => {
        Cookies.set("token", res.data.token);
        Cookies.set("teamID", res.data.user.teamKey);
        if(res.data.user.isAdmin===1){
          navigate('/admin-dashboard');
          window.location.reload();
        }
        else{
          navigate('/standard-schedule');
          window.location.reload();
        }
      }).catch((error) => {
        console.log(error);
      });
  }
  return (
    <div className = "wrapper">
    <div className = "col-md-6">
      <form onSubmit={handleSubmit} style={{marginLeft: "10em", marginTop: "10em", marginBottom: "10em", float: "left"}}>
        <h2>Already a member?</h2>
        <p>Please login...</p>
        <label htmlFor="login_email"><b>Email:</b></label>
        <br/>
        <input type="email" placeholder="" id="login_email" value={email} onChange={handleEmailChange} required/>
        <br/>
        <br/>
        <label htmlFor="login_password"><b>Password:</b></label>
        <br/>
        <input type="password" placeholder="" id="login_password" value={password} onChange={handlePasswordChange} required/>
        <br/>
        <br/>
        <button type="submit" className="login">Login</button>
      </form>
    </div>
    <div className="col-md-6" style={{float: "right"}}>
      <div style={{marginTop: "15em", textAlign: "center"}}>
      <h2>New to SmartSchedule?</h2>
      <br/>
      <Link to="/register">
      <button>
      Click here to Register
      </button>
      </Link>
    </div>
    </div>
    </div>
  );
}

export default Login;
