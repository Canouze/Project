import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Cookies from "js-cookie";
import axios from 'axios';

function AdminDashboard(){
  const[userObj, setUserObj] = useState('');
  useEffect(() => {
    axios.get("/check-auth", {withCredentials: true, headers: {"Authorisation": `Bearer ${Cookies.get('token')}`} })
    .then(res => {
    setUserObj(res.data);
    })
    .catch(function (error) {
      console.log(error);
    })
  }, [])
  return(
    <div>
      <div className="container-fluid" style={{alignItems: "center", paddingTop: "3em", paddingBottom: "3em"}}>
        <div className="row">
          <div className="col-md-12">
            <h1 style={{textAlign: "center"}}>Welcome {userObj.userName}</h1>
          </div>
        </div>
        <div classname="row">
          <div className="col-md-12">
            <h2 style={{textAlign: "center"}}>(Admin User)</h2>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4" style={{textAlign: "center"}}>
          <Link to='/view-projects'>
            <img src="project_icon.png"  style={{width: "40%", height: "auto", marginLeft: "auto", marginRight: "auto"}} alt="Project Icon"/>
          </Link>
            <h2 style={{paddingTop: "0.5em"}}>View Projects</h2>
          </div>
          <div className="col-md-4" style={{textAlign: "center"}}>
          <Link to='/schedule'>
            <img src="schedule_icon.png"  style={{width: "40%", height: "auto"}} alt="Schedule Icon"/>
          </Link>
            <h2 style={{paddingTop: "0.5em"}}>View Schedule</h2>
          </div>
          <div className="col-md-4" style={{textAlign: "center"}}>
          <Link to='/view-employees'>
            <img src="employees_icon.png"  style={{width: "40%", height: "auto", marginLeft: "auto", marginRight: "auto"}} alt="Employee Icon"/>
          </Link>
            <h2 style={{paddingTop: "0.5em"}}>Employees</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard;
