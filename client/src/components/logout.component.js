import React, {useEffect} from 'react';
import Cookies from "js-cookie";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
const async = require('async');


function Logout(){
  let navigate = useNavigate();
  function timer(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }
  async function wait(){
    await wait(3000);
  }
  const handleLoad = e => {
    Cookies.remove('token');
    wait();
    navigate('/login');
    window.location.reload();
  }
  return(
    <div>
      <h1 onLoad={handleLoad()} style={{marginTop: "5em", textAlign: "center"}}>You have logged out...</h1>
    </div>
  )
}

export default Logout;
