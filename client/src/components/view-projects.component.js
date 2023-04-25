import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import './stylesheet.css';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom'


function ViewProjects(){

  let navigate = useNavigate();

  const [display, setDisplay] = useState([]);
  const [days, setDays] = useState(600);
  const [filteredOut, setFilteredOut] = useState(0);

  useEffect(() => {
    axios.get("/view-projects", {params: {days: days}, withCredentials: true, headers: {"Authorisation": `Bearer ${Cookies.get('token')}`} })
    .then(res => {
      setDisplay(res.data.displayProjects);
      setFilteredOut(res.data.filteredOut);
      console.log(display);
    })
    .catch(function (error){
      console.log(error);
    })
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    axios.get("/view-projects", {params: {days: days}, withCredentials: true, headers: {"Authorisation": `Bearer ${Cookies.get('token')}`} })
    .then(res => {
      setDisplay(res.data.displayProjects);
      setFilteredOut(res.data.filteredOut);
      console.log(display);
    })
    .catch(function (error){
      console.log(error);
    })
  }

  const handleUpdate = e => {
    setDays(e.target.value);
  }

  return(
    <div className="wrapper">
      <div class="container-fluid">
        <form onSubmit={handleSubmit}>
          <div class="col-lg-4" style={{float: "left", textAlign: "center", paddingTop:"1.5em", paddingBottom: "1.5em"}}>
            <h4>Days to Deadline</h4>
            <input type="range" name="deadline" onChange={handleUpdate} min="0" max="600" value={days} class="slider" id="deadline"/>
            <p>Days until Project Deadline: <span id="deadline">{days}</span></p>
          </div>
          <div class="col-lg-4 filcontainer3" style={{float: "left", textAlign: "center", paddingTop:"1.5em", paddingBottom: "1.5em"}}>
            <b id="shown">Projects Displayed: {display.length}</b><br></br>
            <button type="submit" id="applyfilters" style={{marginTop: "5px", marginBottom: "5px"}}>Apply Filters</button><br></br>
            <b id="filtout">Projects Filtered Out: {filteredOut}</b>
          </div>
          <div class="col-lg-4 filcontainer3" height="200px" style={{float: "left", textAlign: "center", paddingTop:"1.5", paddingBottom: "1.5em", alignItems: "center", justifyContent: "center"}}>
          <Link to="/create-project"><img src="add_project.png" style={{paddingTop: "1em"}} height="50px" alt="Add Project"/></Link>
          <br></br>
          <h4>Add Project</h4>
          </div>
        </form>
      </div>
      <div class="col-md-12">
        <table id="project_table" width="100%" border="1">
          <thead>
            <tr style={{height: "50px", backgroundColor: "#5F9EA0", color: "white"}}>
              <th>Project Name</th>
              <th>Client Name</th>
              <th>Project Location</th>
              <th>Contact Name</th>
              <th>Contact Number</th>
              <th>Deadline</th>
            </tr>
          </thead>
          <tbody>
            {display.map((d) => {
              return(
                <tr style={{height: "50px", border: "1px solid"}}>
                  <td>{d.project_name}</td>
                  <td>{d.client_name}</td>
                  <td>{d.project_location}</td>
                  <td>{d.contact_name}</td>
                  <td>{d.contact_number}</td>
                  <td>{d.project_deadline}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewProjects;
