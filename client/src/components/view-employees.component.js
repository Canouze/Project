import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";

function ViewEmployees(){

  let navigate = useNavigate();

  const [display, setDisplay] = useState([]);

  useEffect(() => {
    axios.get("/view-emloyees", { withCredentials: true, headers: {"Authorisation": `Bearer ${Cookies.get('token')}`} })
    .then(res => {
      setDisplay(res.data.displayProjects);
    })
    .catch(function (error){
      console.log(error);
    })
  }, []);

  return(
    <div className="wrapper">
      <div class="col-md-10">
        <table id="employee_table" width="100%" border="1">
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
