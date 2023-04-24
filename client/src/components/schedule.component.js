import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom'
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import withRouter from './withRouter.component'
function Schedule(){
  let navigate = useNavigate();
  const [display, setDisplay] = useState([["", "", "", "", "", "", "", ""]]);
  const [weekAdder, setWeekAdder] = useState(0);
  const [teamGet, setTeamGet] = useState(1);
  const [dates, setDates] = useState(["", "", "", "", "", "", ""])
  useEffect(() => {
    axios.get("/schedule", { params: {weekAdder: weekAdder, teamGet: teamGet}, withCredentials: true, date: "", headers: {"Authorisation": `Bearer ${Cookies.get('token')}`} })
      .then(res => {
        setDisplay(res.data.scheduleArray);
        setDates(res.data.dates);
      })
      .catch(function (error) {
        if(error.response.data.error==="Please login"){
          navigate('/login');
        }
        console.log("Server Error");
      })
  }, [])

  const handleButtonClick = num => {
    setWeekAdder(weekAdder+num);
    axios.get("/schedule", { params: {weekAdder: weekAdder, teamGet: teamGet}, withCredentials: true, date: "", headers: {"Authorisation" : `Bearer ${Cookies.get('token')}`} })
      .then(res => {
        setDisplay(res.data.scheduleArray);
        setDates(res.data.dates);
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  return(
    <div className = "wrapper">
      <div class="col-md-1" style={{display: "inline-block", marginLeft: "auto", marginRight: "auto"}}>
        <button type="button" onClick={() => {handleButtonClick(-1)}}>
          <img src="left_arrow.png" style={{float: "left"}} width='75%' alt="Left Arrow"/>
        </button>
      </div>
      <div class="col-md-10" style={{display: "inline-block"}}>
        <table id='schedule_table' width='100%' border='1'>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Sunday</th>
              <th>Monday</th>
              <th>Tuesday</th>
              <th>Wednesday</th>
              <th>Thursday</th>
              <th>Friday</th>
              <th>Saturday</th>
            </tr>
            <tr>
              <td></td>
              <td>{dates[0]}</td>
              <td>{dates[1]}</td>
              <td>{dates[2]}</td>
              <td>{dates[3]}</td>
              <td>{dates[4]}</td>
              <td>{dates[5]}</td>
              <td>{dates[6]}</td>
            </tr>
          </thead>
          <tbody>
             {display.map((d) => {
              return(
                <tr>
                  <td>{d[0]}</td>
                  <td>
                    <Link to='/create-schedule'
                      state={{employee: d[0], id: d[1], date: dates[0]}}
                    >{d[2]}</Link>
                  </td>
                  <td>
                    <Link to='/create-schedule'
                      state={{employee: d[0], id: d[1], date: dates[1]}}
                    >{d[3]}</Link>
                  </td>
                  <td>
                    <Link to='/create-schedule'
                      state={{employee: d[0], id: d[1], date: dates[2]}}
                    >{d[4]}</Link>
                  </td>
                  <td>
                    <Link to='/create-schedule'
                      state={{employee: d[0], id: d[1], date: dates[3]}}
                    >{d[5]}</Link>
                  </td>
                  <td>
                    <Link to='/create-schedule'
                      state={{employee: d[0], id: d[1], date: dates[4]}}
                    >{d[6]}</Link>
                  </td>
                  <td>
                    <Link to='/create-schedule'
                      state={{employee: d[0], id: d[1], date: dates[5]}}
                    >{d[7]}</Link>
                  </td>
                  <td>
                    <Link to='/create-schedule'
                      state={{employee: d[0], id: d[1], date: dates[6]}}
                    >{d[7]}</Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div class="col-md-1" style={{display: "inline-block"}}>
        <button type="button" onClick={() => {handleButtonClick(1)}}>
          <img src="right_arrow.png" style={{float: "right"}} width='75%' alt="Left Arrow"/>
        </button>
      </div>
    </div>
  )
}
export default Schedule;
