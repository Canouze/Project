import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";

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
          <div class="col-lg-6" style={{float: "left"}}>
            <h4>Days to Deadline</h4>
            <input type="range" name="deadline" onChange={handleUpdate} min="0" max="600" value={days} class="slider" id="deadline"/>
            <p>Days until Project Deadline: <span id="deadline">{days}</span></p>
          </div>
          <div class="col-lg-6 filcontainer3" style={{float: "left"}}>
            <b id="shown">Projects Displayed: {display.length}</b><br></br>
            <button type="submit" id="applyfilters">Apply Filters</button><br></br>
            <b id="filtout">Projects Filtered Out: {filteredOut}</b>
          </div>
        </form>
      </div>
      <div class="col-md-10">
        <table id="project_table" width="100%" border="1">
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Project Location</th>
              <th>Deadline</th>
            </tr>
          </thead>
          <tbody>
            {display.map((d) => {
              return(
                <tr>
                  <td>{d.project_name}</td>
                  <td>{d.project_location}</td>
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
