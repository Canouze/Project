import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom'
import './stylesheet.css';


function ViewEmployees(){

  let navigate = useNavigate();

  const [display, setDisplay] = useState([]);
  const [startDate, setStartDate] = useState(0);
  const [level, setLevel] = useState(0);
  const [filteredOut, setFilteredOut] = useState(0);

  useEffect(() => {
    const newObj = {
      teamKey: Cookies.get("teamID"),
      startDate: startDate,
      level: level
    }
    axios.post("/view-employees", newObj, { headers: {"Authorisation": `Bearer ${Cookies.get('token')}`} })
    .then(res => {
      setDisplay(res.data.displayEmployees);
      setFilteredOut(res.data.filteredOut);
    })
    .catch(function (error){
      console.log(error);
    })
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    const newObj = {
      teamKey: Cookies.get("teamID"),
      startDate: startDate,
      level: level
    }
    axios.post("/view-employees", newObj, { withCredentials: true, headers: {"Authorisation": `Bearer ${Cookies.get('token')}`} })
    .then(res => {
      setDisplay(res.data.displayEmployees);
      setFilteredOut(res.data.filteredOut);
      if(display.user_startdate==null){
        display.userStartDate="Empty     ";
      }
      console.log(display.user_startdate)
    })
    .catch(function (error){
      console.log(error);
    })
  }

  const handleUpdate1 = e => {
    setStartDate(e.target.value);
  }

  const handleUpdate2 = e => {
    setLevel(e.target.value)
  }

  const fixer = d => {
    console.log("yep1")
    console.log(d.user_startdate)
    console.log(typeof d.user_startdate)
    if(typeof d.user_startdate === "object"){
      return "No data"
    }
    else{
      return(
        d.user_startdate.slice(0,10)
      )
    }
  }

  return(
    <div className="wrapper">
    <form onSubmit={handleSubmit}>
      <div class="col-lg-4" style={{float: "left", textAlign: "center", paddingTop:"1.5em", paddingBottom: "1.5em"}}>
        <h4>Employment Duration</h4>
        <input type="range" name="deadline" onChange={handleUpdate1} min="0" max="3000" value={startDate} class="slider" id="deadline"/>
        <p>Days Employed:<span id="deadline">{" "+startDate}</span></p>
      </div>
      <div class="col-lg-4 filcontainer3" style={{float: "left", textAlign: "center", paddingTop:"1.5em", paddingBottom: "1.5em"}}>
        <h4>Employee Level</h4>
        <input type="range" name="deadline" onChange={handleUpdate2} min="0" max="5" value={level} class="slider" id="deadline"/>
        <p>Level:<span id="deadline">{" "+level}</span></p>
      </div>
      <div class="col-lg-4 filcontainer3" style={{float: "left", textAlign: "center", paddingTop:"1.5em", paddingBottom: "1.5em"}}>
        <b id="shown">Projects Displayed: {display.length}</b><br></br>
        <button type="submit" id="applyfilters" style={{marginTop: "5px", marginBottom: "5px"}}>Apply Filters</button><br></br>
        <b id="filtout">Projects Filtered Out: {filteredOut}</b>
      </div>
    </form>
      <div class="col-md-12">
        <table id="employee_table" width="100%" border="1">
          <thead>
            <tr style={{height: "70px", border: "1px solid", backgroundColor: "#5F9EA0", color: "white"}}>
              <th>Employee Name</th>
              <th>Email Address</th>
              <th>Start Date</th>
              <th>Employee Level</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {display.map((d) => {
              return(
                <tr style={{height: "70px"}}>
                  <td>{d.user_fname+" "+d.user_lname}</td>
                  <td>{d.user_email}</td>
                  <td>{fixer(d)}</td>
                  <td>{d.user_level||"No Data"}</td>
                  <td><Link to="/edit-employee" state={{employeeID: d.user_id, employeeStartDate: d.user_startdate, employeeLevel: d.user_level}}>Edit</Link></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewEmployees;
