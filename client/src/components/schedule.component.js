import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './stylesheet.css';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom'
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import withRouter from './withRouter.component'
const async = require('async');

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
  const querySelector1 = (num) => {
    return new Promise((resolve, reject) => {
      console.log(weekAdder);
      setWeekAdder(weekAdder+num)
      console.log(weekAdder);
      return resolve();
    })
  }
  const querySelector2 = () => {
    return new Promise((resolve, reject) => {
      axios.get("/schedule", { params: {weekAdder: weekAdder, teamGet: teamGet}, withCredentials: true, date: "", headers: {"Authorisation" : `Bearer ${Cookies.get('token')}`} })
        .then(res => {
          setDisplay(res.data.scheduleArray);
          setDates(res.data.dates);
        })
        .catch(function (error) {
          console.log(error);
        })
      return resolve();
    })
  }

  async function handleButtonClick(num){
    let use = num;
    await querySelector1(use);
    await querySelector2();
  }

  return(
    <div className = "wrapper">
      <div class="col-md-12" style={{display: "inline-block", paddingTop: "2em"}}>
        <table id='schedule_table' width='100%' border='1' style={{border: "1px solid"}}>
          <thead>
            <tr style={{height: "50px", border: "1px solid", backgroundColor: "#5F9EA0", color: "white"}}>
              <th></th>
              <th>Sunday</th>
              <th>Monday</th>
              <th>Tuesday</th>
              <th>Wednesday</th>
              <th>Thursday</th>
              <th>Friday</th>
              <th>Saturday</th>
            </tr>
            <tr style={{height: "50px", border: "1px solid"}}>
              <td style={{backgroundColor: "#5F9EA0"}}>
                <button type="button" onClick={() => handleButtonClick(-1)}>
                  <img src="left_arrow.png" style={{float: "left"}} height="30px" alt="Left Arrow"/>
                </button>
                <button type="button" onClick={() => {handleButtonClick(1)}}>
                  <img src="right_arrow.png" style={{float: "right"}} height="30px" alt="Left Arrow"/>
                </button>
              </td>
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
                <tr style={{border: "1px solid"}}>
                  <td style={{backgroundColor: "#5F9EA0", color: "white"}}>{d[0]}</td>
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
    </div>
  )
}
export default Schedule;
