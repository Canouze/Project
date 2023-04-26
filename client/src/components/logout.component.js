import React, {useEffect} from 'react';
import Cookies from "js-cookie";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
const async = require('async');


function Logout(){
  let navigate = useNavigate();
  useEffect(()=>{
    Cookies.remove('token');
    Cookies.remove('teamID');
    navigate('/login');
    window.location.reload();
  })

  return(
    <div>
      <h1 style={{marginTop: "5em", textAlign: "center"}}>You have logged out...</h1>
    </div>
  )
}

export default Logout;
